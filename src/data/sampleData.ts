import { UnemploymentData } from '../types';

// Sample Indian unemployment data for demonstration
export const sampleUnemploymentData: UnemploymentData[] = [
  // 2016 data
  { id: '1', date: '2016-01', state: 'Delhi', region: 'Urban', unemploymentRate: 4.2, population: 16800000, laborForce: 8400000, estimatedUnemployed: 352800 },
  { id: '2', date: '2016-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 3.8, population: 12400000, laborForce: 6200000, estimatedUnemployed: 235600 },
  { id: '3', date: '2016-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 5.1, population: 199800000, laborForce: 99900000, estimatedUnemployed: 5094900 },
  { id: '4', date: '2016-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 4.5, population: 112400000, laborForce: 56200000, estimatedUnemployed: 2529000 },
  { id: '5', date: '2016-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 3.9, population: 72100000, laborForce: 36050000, estimatedUnemployed: 1405950 },
  
  // 2017 data
  { id: '6', date: '2017-01', state: 'Delhi', region: 'Urban', unemploymentRate: 4.5, population: 16900000, laborForce: 8450000, estimatedUnemployed: 380250 },
  { id: '7', date: '2017-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 4.1, population: 12500000, laborForce: 6250000, estimatedUnemployed: 256250 },
  { id: '8', date: '2017-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 5.3, population: 200500000, laborForce: 100250000, estimatedUnemployed: 5313250 },
  { id: '9', date: '2017-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 4.7, population: 113100000, laborForce: 56550000, estimatedUnemployed: 2657850 },
  { id: '10', date: '2017-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 4.2, population: 72500000, laborForce: 36250000, estimatedUnemployed: 1522500 },

  // 2018 data
  { id: '11', date: '2018-01', state: 'Delhi', region: 'Urban', unemploymentRate: 5.1, population: 17000000, laborForce: 8500000, estimatedUnemployed: 433500 },
  { id: '12', date: '2018-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 4.8, population: 12600000, laborForce: 6300000, estimatedUnemployed: 302400 },
  { id: '13', date: '2018-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 5.8, population: 201200000, laborForce: 100600000, estimatedUnemployed: 5834800 },
  { id: '14', date: '2018-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 5.2, population: 113800000, laborForce: 56900000, estimatedUnemployed: 2958800 },
  { id: '15', date: '2018-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 4.7, population: 72900000, laborForce: 36450000, estimatedUnemployed: 1713150 },

  // 2019 data
  { id: '16', date: '2019-01', state: 'Delhi', region: 'Urban', unemploymentRate: 6.2, population: 17100000, laborForce: 8550000, estimatedUnemployed: 530100 },
  { id: '17', date: '2019-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 5.5, population: 12700000, laborForce: 6350000, estimatedUnemployed: 349250 },
  { id: '18', date: '2019-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 6.5, population: 201900000, laborForce: 100950000, estimatedUnemployed: 6561750 },
  { id: '19', date: '2019-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 5.8, population: 114500000, laborForce: 57250000, estimatedUnemployed: 3320500 },
  { id: '20', date: '2019-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 5.3, population: 73300000, laborForce: 36650000, estimatedUnemployed: 1942450 },

  // 2020 data (COVID impact)
  { id: '21', date: '2020-01', state: 'Delhi', region: 'Urban', unemploymentRate: 7.8, population: 17200000, laborForce: 8600000, estimatedUnemployed: 670800 },
  { id: '22', date: '2020-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 8.2, population: 12800000, laborForce: 6400000, estimatedUnemployed: 524800 },
  { id: '23', date: '2020-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 8.9, population: 202600000, laborForce: 101300000, estimatedUnemployed: 9015700 },
  { id: '24', date: '2020-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 7.6, population: 115200000, laborForce: 57600000, estimatedUnemployed: 4377600 },
  { id: '25', date: '2020-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 6.9, population: 73700000, laborForce: 36850000, estimatedUnemployed: 2542650 },

  // 2021 data
  { id: '26', date: '2021-01', state: 'Delhi', region: 'Urban', unemploymentRate: 9.2, population: 17300000, laborForce: 8650000, estimatedUnemployed: 795800 },
  { id: '27', date: '2021-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 9.8, population: 12900000, laborForce: 6450000, estimatedUnemployed: 632100 },
  { id: '28', date: '2021-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 10.5, population: 203300000, laborForce: 101650000, estimatedUnemployed: 10673250 },
  { id: '29', date: '2021-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 8.9, population: 115900000, laborForce: 57950000, estimatedUnemployed: 5157550 },
  { id: '30', date: '2021-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 8.1, population: 74100000, laborForce: 37050000, estimatedUnemployed: 3001050 },

  // 2022 data (Recovery phase)
  { id: '31', date: '2022-01', state: 'Delhi', region: 'Urban', unemploymentRate: 7.1, population: 17400000, laborForce: 8700000, estimatedUnemployed: 617700 },
  { id: '32', date: '2022-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 6.8, population: 13000000, laborForce: 6500000, estimatedUnemployed: 442000 },
  { id: '33', date: '2022-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 7.8, population: 204000000, laborForce: 102000000, estimatedUnemployed: 7956000 },
  { id: '34', date: '2022-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 6.5, population: 116600000, laborForce: 58300000, estimatedUnemployed: 3789500 },
  { id: '35', date: '2022-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 6.2, population: 74500000, laborForce: 37250000, estimatedUnemployed: 2309500 },

  // 2023 data
  { id: '36', date: '2023-01', state: 'Delhi', region: 'Urban', unemploymentRate: 5.8, population: 17500000, laborForce: 8750000, estimatedUnemployed: 507500 },
  { id: '37', date: '2023-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 5.2, population: 13100000, laborForce: 6550000, estimatedUnemployed: 340600 },
  { id: '38', date: '2023-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 6.9, population: 204700000, laborForce: 102350000, estimatedUnemployed: 7062150 },
  { id: '39', date: '2023-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 5.7, population: 117300000, laborForce: 58650000, estimatedUnemployed: 3343050 },
  { id: '40', date: '2023-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 5.1, population: 74900000, laborForce: 37450000, estimatedUnemployed: 1909950 },

  // 2024 data
  { id: '41', date: '2024-01', state: 'Delhi', region: 'Urban', unemploymentRate: 4.9, population: 17600000, laborForce: 8800000, estimatedUnemployed: 431200 },
  { id: '42', date: '2024-01', state: 'Mumbai', region: 'Urban', unemploymentRate: 4.5, population: 13200000, laborForce: 6600000, estimatedUnemployed: 297000 },
  { id: '43', date: '2024-01', state: 'Uttar Pradesh', region: 'Rural', unemploymentRate: 6.2, population: 205400000, laborForce: 102700000, estimatedUnemployed: 6367400 },
  { id: '44', date: '2024-01', state: 'Maharashtra', region: 'Rural', unemploymentRate: 5.1, population: 118000000, laborForce: 59000000, estimatedUnemployed: 3009000 },
  { id: '45', date: '2024-01', state: 'Tamil Nadu', region: 'Urban', unemploymentRate: 4.6, population: 75300000, laborForce: 37650000, estimatedUnemployed: 1731900 },
];