import Papa from 'papaparse';
import { UnemploymentData, StateData, TimeSeriesData, AnalysisMetrics } from '../types';
import { sampleUnemploymentData } from '../data/sampleData';

export class DataService {
  private data: UnemploymentData[] = [];

  constructor() {
    this.data = sampleUnemploymentData;
  }

  // Parse CSV data with better error handling
  async parseCSV(file: File): Promise<UnemploymentData[]> {
    return new Promise((resolve, reject) => {
      console.log('Starting CSV parse for file:', file.name, 'Size:', file.size);
      
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => {
          // Normalize header names to handle variations
          const normalized = header.trim().toLowerCase().replace(/[()%]/g, '').replace(/\s+/g, '_');
          const headerMap: { [key: string]: string } = {
            'year': 'date',
            'date': 'date',
            'unemployment_rate': 'unemploymentRate',
            'unemployment_rate_': 'unemploymentRate',
            'national_unemployment_rate_': 'unemploymentRate',
            'national_unemployment_rate': 'unemploymentRate',
            'unemployment rate': 'unemploymentRate',
            'rate': 'unemploymentRate',
            'urban_unemployment_rate_': 'urbanUnemploymentRate',
            'urban_unemployment_rate': 'urbanUnemploymentRate',
            'rural_unemployment_rate_': 'ruralUnemploymentRate',
            'rural_unemployment_rate': 'ruralUnemploymentRate',
            'labor_force': 'laborForce',
            'labor force': 'laborForce',
            'estimated_unemployed': 'estimatedUnemployed',
            'estimated unemployed': 'estimatedUnemployed',
            'unemployed': 'estimatedUnemployed',
            'state': 'state',
            'population': 'population'
          };
          return headerMap[normalized] || header.trim();
        },
        complete: (results) => {
          console.log('CSV parse complete. Results:', results);
          
          if (results.errors && results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
            reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
            return;
          }

          try {
            const rawData = results.data as any[];
            console.log('Raw data sample:', rawData.slice(0, 3));
            
            if (!rawData || rawData.length === 0) {
              reject(new Error('CSV file is empty or contains no valid data'));
              return;
            }

            // Check for required columns - state is now optional for national data
            const firstRow = rawData[0];
            const requiredFields = ['date'];
            const missingFields = requiredFields.filter(field => 
              !(field in firstRow) && !Object.keys(firstRow).some(key => 
                key.toLowerCase().includes(field.toLowerCase())
              )
            );

            if (missingFields.length > 0) {
              reject(new Error(`Missing required columns: ${missingFields.join(', ')}. Available columns: ${Object.keys(firstRow).join(', ')}`));
              return;
            }

            // Check if we have unemployment rate data in any form
            const hasUnemploymentData = Object.keys(firstRow).some(key => 
              key.includes('unemploymentRate') || key.includes('urbanUnemploymentRate') || key.includes('ruralUnemploymentRate')
            );

            if (!hasUnemploymentData) {
              reject(new Error('No unemployment rate data found. Please ensure your CSV contains unemployment rate columns.'));
              return;
            }

            const parsedData: UnemploymentData[] = rawData
              .map((row: any, index: number) => {
                try {
                  // Handle different possible column names
                  const getFieldValue = (fieldName: string, alternatives: string[] = []) => {
                    if (row[fieldName] !== undefined) return row[fieldName];
                    for (const alt of alternatives) {
                      if (row[alt] !== undefined) return row[alt];
                    }
                    return null;
                  };

                  // Get unemployment rate from various possible sources
                  let unemploymentRate = parseFloat(
                    getFieldValue('unemploymentRate', ['unemployment_rate', 'rate', 'Unemployment Rate']) || '0'
                  );

                  // If no direct unemployment rate, try to use national, urban, or rural rates
                  if (unemploymentRate === 0) {
                    const urbanRate = parseFloat(getFieldValue('urbanUnemploymentRate') || '0');
                    const ruralRate = parseFloat(getFieldValue('ruralUnemploymentRate') || '0');
                    
                    if (urbanRate > 0 && ruralRate > 0) {
                      unemploymentRate = (urbanRate + ruralRate) / 2; // Average of urban and rural
                    } else if (urbanRate > 0) {
                      unemploymentRate = urbanRate;
                    } else if (ruralRate > 0) {
                      unemploymentRate = ruralRate;
                    }
                  }
                  
                  if (isNaN(unemploymentRate) || unemploymentRate === 0) {
                    console.warn(`Invalid unemployment rate at row ${index + 1}:`, row);
                    return null;
                  }

                  // Handle date field
                  const dateValue = getFieldValue('date', ['Date', 'year', 'Year']) || '';
                  
                  // Handle state field - default to 'National' if not provided
                  const stateValue = getFieldValue('state', ['State']) || 'National';

                  // Determine region based on available data
                  let region: 'Urban' | 'Rural' = 'Urban';
                  const urbanRate = parseFloat(getFieldValue('urbanUnemploymentRate') || '0');
                  const ruralRate = parseFloat(getFieldValue('ruralUnemploymentRate') || '0');
                  
                  // If we have both urban and rural data, create entries for both
                  const items: UnemploymentData[] = [];
                  
                  if (urbanRate > 0 && ruralRate > 0) {
                    // Create separate entries for urban and rural
                    items.push({
                      id: `imported_${index + 1}_urban`,
                      date: dateValue,
                      state: stateValue,
                      region: 'Urban',
                      unemploymentRate: urbanRate,
                      population: parseInt(getFieldValue('population', ['Population']) || '0') || 0,
                      laborForce: parseInt(getFieldValue('laborForce', ['labor_force', 'Labor Force']) || '0') || 0,
                      estimatedUnemployed: parseInt(getFieldValue('estimatedUnemployed', ['estimated_unemployed', 'Unemployed']) || '0') || 0,
                    });
                    
                    items.push({
                      id: `imported_${index + 1}_rural`,
                      date: dateValue,
                      state: stateValue,
                      region: 'Rural',
                      unemploymentRate: ruralRate,
                      population: parseInt(getFieldValue('population', ['Population']) || '0') || 0,
                      laborForce: parseInt(getFieldValue('laborForce', ['labor_force', 'Labor Force']) || '0') || 0,
                      estimatedUnemployed: parseInt(getFieldValue('estimatedUnemployed', ['estimated_unemployed', 'Unemployed']) || '0') || 0,
                    });
                    
                    return items;
                  } else {
                    // Single entry with the unemployment rate we found
                    const item: UnemploymentData = {
                      id: getFieldValue('id') || `imported_${index + 1}`,
                      date: dateValue,
                      state: stateValue,
                      region: region,
                      unemploymentRate,
                      population: parseInt(getFieldValue('population', ['Population']) || '0') || 0,
                      laborForce: parseInt(getFieldValue('laborForce', ['labor_force', 'Labor Force']) || '0') || 0,
                      estimatedUnemployed: parseInt(getFieldValue('estimatedUnemployed', ['estimated_unemployed', 'Unemployed']) || '0') || 0,
                    };

                    // Validate required fields
                    if (!item.date || item.unemploymentRate === 0) {
                      console.warn(`Skipping invalid row ${index + 1}:`, item);
                      return null;
                    }

                    return [item];
                  }
                } catch (error) {
                  console.warn(`Error processing row ${index + 1}:`, error, row);
                  return null;
                }
              })
              .filter((item): item is UnemploymentData[] => item !== null)
              .flat();

            console.log(`Successfully parsed ${parsedData.length} records from ${rawData.length} rows`);

            if (parsedData.length === 0) {
              reject(new Error('No valid data rows found in CSV. Please check the data format.'));
              return;
            }

            // Update internal data
            this.data = parsedData;
            resolve(parsedData);
          } catch (error) {
            console.error('Error processing CSV data:', error);
            reject(new Error(`Error processing CSV data: ${error instanceof Error ? error.message : 'Unknown error'}`));
          }
        },
        error: (error) => {
          console.error('Papa Parse error:', error);
          reject(new Error(`CSV parsing failed: ${error.message}`));
        }
      });
    });
  }

  // Get all data
  getAllData(): UnemploymentData[] {
    return this.data;
  }

  // Get time series data for charts
  getTimeSeriesData(): TimeSeriesData[] {
    const timeSeriesMap = new Map<string, { total: number; urban: number; rural: number; urbanCount: number; ruralCount: number }>();

    this.data.forEach(item => {
      const existing = timeSeriesMap.get(item.date) || { total: 0, urban: 0, rural: 0, urbanCount: 0, ruralCount: 0 };
      
      if (item.region === 'Urban') {
        existing.urban += item.unemploymentRate;
        existing.urbanCount++;
      } else {
        existing.rural += item.unemploymentRate;
        existing.ruralCount++;
      }
      
      timeSeriesMap.set(item.date, existing);
    });

    return Array.from(timeSeriesMap.entries())
      .map(([date, data]) => ({
        date,
        unemploymentRate: (data.urban / (data.urbanCount || 1) + data.rural / (data.ruralCount || 1)) / 2,
        urban: data.urban / (data.urbanCount || 1),
        rural: data.rural / (data.ruralCount || 1),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // Get state-wise analysis
  getStateAnalysis(): StateData[] {
    const stateMap = new Map<string, { rates: number[]; totalRate: number; count: number }>();

    this.data.forEach(item => {
      const existing = stateMap.get(item.state) || { rates: [], totalRate: 0, count: 0 };
      existing.rates.push(item.unemploymentRate);
      existing.totalRate += item.unemploymentRate;
      existing.count++;
      stateMap.set(item.state, existing);
    });

    return Array.from(stateMap.entries()).map(([state, data]) => {
      const avgRate = data.totalRate / data.count;
      const firstRate = data.rates[0];
      const lastRate = data.rates[data.rates.length - 1];
      
      let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
      if (lastRate > firstRate * 1.1) trend = 'increasing';
      else if (lastRate < firstRate * 0.9) trend = 'decreasing';

      return {
        state,
        avgUnemploymentRate: Number(avgRate.toFixed(2)),
        trend,
        dataPoints: data.count,
      };
    }).sort((a, b) => b.avgUnemploymentRate - a.avgUnemploymentRate);
  }

  // Get analysis metrics
  getAnalysisMetrics(): AnalysisMetrics {
    if (this.data.length === 0) {
      return {
        averageRate: 0,
        peakRate: 0,
        peakDate: '',
        lowestRate: 0,
        lowestDate: '',
        totalDataPoints: 0,
        statesAnalyzed: 0,
      };
    }

    const rates = this.data.map(d => d.unemploymentRate);
    const averageRate = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
    
    const peakData = this.data.reduce((max, item) => 
      item.unemploymentRate > max.unemploymentRate ? item : max
    );
    
    const lowestData = this.data.reduce((min, item) => 
      item.unemploymentRate < min.unemploymentRate ? item : min
    );

    const uniqueStates = new Set(this.data.map(d => d.state));

    return {
      averageRate: Number(averageRate.toFixed(2)),
      peakRate: peakData.unemploymentRate,
      peakDate: peakData.date,
      lowestRate: lowestData.unemploymentRate,
      lowestDate: lowestData.date,
      totalDataPoints: this.data.length,
      statesAnalyzed: uniqueStates.size,
    };
  }

  // Filter data by date range
  filterByDateRange(startDate: string, endDate: string): UnemploymentData[] {
    return this.data.filter(item => item.date >= startDate && item.date <= endDate);
  }

  // Filter data by state
  filterByState(state: string): UnemploymentData[] {
    return this.data.filter(item => item.state === state);
  }

  // Get unique states
  getUniqueStates(): string[] {
    return Array.from(new Set(this.data.map(d => d.state))).sort();
  }
}

export const dataService = new DataService();