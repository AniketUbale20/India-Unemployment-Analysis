import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { dataService } from './services/dataService';
import { UnemploymentData, AnalysisMetrics } from './types';
import { MetricsCard } from './components/MetricsCard';
import { TimeSeriesChart } from './components/TimeSeriesChart';
import { StateComparisonChart } from './components/StateComparisonChart';
import { DataTable } from './components/DataTable';
import { FileUpload } from './components/FileUpload';

function App() {
  const [data, setData] = useState<UnemploymentData[]>([]);
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [selectedState, setSelectedState] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'data' | 'upload'>('dashboard');
  const [uploadStatus, setUploadStatus] = useState<string>('');

  useEffect(() => {
    // Load initial data
    const initialData = dataService.getAllData();
    setData(initialData);
    setMetrics(dataService.getAnalysisMetrics());
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setUploadStatus('Processing CSV file...');
    
    try {
      console.log('Starting file upload process for:', file.name);
      const parsedData = await dataService.parseCSV(file);
      
      console.log('Parsed data:', parsedData.length, 'records');
      setData(parsedData);
      setMetrics(dataService.getAnalysisMetrics());
      setUploadStatus(`Successfully loaded ${parsedData.length} records from ${file.name}`);
      
      // Switch to dashboard to show results
      setTimeout(() => {
        setActiveTab('dashboard');
        setUploadStatus('');
      }, 2000);
      
    } catch (error) {
      console.error('Error parsing CSV:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setUploadStatus(`Error: ${errorMessage}`);
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setUploadStatus('');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = selectedState === 'All' 
    ? data 
    : dataService.filterByState(selectedState);

  const timeSeriesData = dataService.getTimeSeriesData();
  const stateAnalysis = dataService.getStateAnalysis();
  const uniqueStates = dataService.getUniqueStates();

  const getMetricsCardProps = () => {
    if (!metrics) return [];
    
    return [
      {
        title: 'Average Rate',
        value: `${metrics.averageRate}%`,
        subtitle: `Across ${metrics.statesAnalyzed} states`,
        icon: BarChart3,
        colorScheme: 'primary' as const,
      },
      {
        title: 'Peak Rate',
        value: `${metrics.peakRate}%`,
        subtitle: metrics.peakDate,
        icon: TrendingUp,
        trend: 'up' as const,
        colorScheme: 'error' as const,
      },
      {
        title: 'Lowest Rate',
        value: `${metrics.lowestRate}%`,
        subtitle: metrics.lowestDate,
        icon: CheckCircle,
        trend: 'down' as const,
        colorScheme: 'success' as const,
      },
      {
        title: 'Data Points',
        value: metrics.totalDataPoints.toLocaleString(),
        subtitle: `${metrics.statesAnalyzed} states analyzed`,
        icon: Users,
        colorScheme: 'primary' as const,
      },
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  🇮🇳 India Unemployment Analysis
                </h1>
                <p className="text-sm text-gray-600">
                  Economic Data Analytics Dashboard (2016-2024)
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="All">All States</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-b border-gray-200">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { key: 'data', label: 'Data Table', icon: Users },
              { key: 'upload', label: 'Upload CSV', icon: MapPin },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Upload Status Banner */}
      {uploadStatus && (
        <div className={`px-4 py-3 text-center text-sm font-medium ${
          uploadStatus.startsWith('Error') 
            ? 'bg-red-100 text-red-800 border-b border-red-200' 
            : uploadStatus.startsWith('Successfully')
            ? 'bg-green-100 text-green-800 border-b border-green-200'
            : 'bg-blue-100 text-blue-800 border-b border-blue-200'
        }`}>
          {uploadStatus}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getMetricsCardProps().map((props, index) => (
                <MetricsCard key={index} {...props} />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-2">
                <TimeSeriesChart data={timeSeriesData} height={400} />
              </div>
              <div className="lg:col-span-2">
                <StateComparisonChart data={stateAnalysis} height={400} />
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                Key Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800">COVID-19 Impact</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Unemployment rates peaked during 2020-2021, reflecting the pandemic's economic impact.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800">Urban vs Rural</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Urban areas showed higher volatility in unemployment rates compared to rural regions.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800">Recovery Trend</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Gradual recovery observed from 2022 onwards, with rates approaching pre-pandemic levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div>
            <DataTable data={filteredData} maxRows={15} />
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                CSV Format Requirements
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Your CSV file should contain the following columns (column names are flexible):</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>date:</strong> Format YYYY-MM (e.g., 2024-01) or any date format</li>
                  <li><strong>state:</strong> State name (e.g., Delhi, Mumbai, Maharashtra)</li>
                  <li><strong>region:</strong> Urban or Rural (optional, defaults to Urban)</li>
                  <li><strong>unemploymentRate:</strong> Percentage (e.g., 5.2) - Required</li>
                  <li><strong>population:</strong> Total population number (optional)</li>
                  <li><strong>laborForce:</strong> Total labor force number (optional)</li>
                  <li><strong>estimatedUnemployed:</strong> Number of unemployed people (optional)</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Column names are flexible. The system will automatically detect variations like 
                    "unemployment_rate", "Unemployment Rate", "rate", etc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Indian Unemployment Data Analysis Dashboard • Built with React, TypeScript & Recharts
            </p>
            <p className="text-xs mt-2">
              Data sources: World Bank, CMIE, and various Indian government statistics
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;