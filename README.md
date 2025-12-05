# 🇮🇳 Indian Unemployment Rate Analysis Dashboard

A comprehensive web application for analyzing unemployment trends in India from 2016-2024. Built with React, TypeScript, and modern data visualization libraries.

![Dashboard Preview](https://courageous-meringue-e0dfb8.netlify.app)

## 🌟 Features

### 📊 Interactive Data Visualization
- **Time Series Analysis**: Track unemployment trends over time with interactive line charts
- **State-wise Comparison**: Compare unemployment rates across different Indian states
- **Urban vs Rural Analysis**: Analyze regional differences in unemployment patterns
- **Real-time Metrics**: Key statistics including average rates, peak periods, and recovery trends

### 📁 Data Management
- **CSV Import**: Upload your own unemployment data in CSV format
- **Flexible Data Format**: Supports various column naming conventions
- **Data Validation**: Automatic validation and error handling for uploaded files
- **Sample Data**: Pre-loaded with Indian unemployment data (2016-2024)

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Indian Theme**: Color scheme inspired by the Indian tricolor
- **Interactive Charts**: Hover effects, tooltips, and smooth animations
- **Professional Layout**: Clean, card-based design with intuitive navigation

## 🚀 Live Demo

**Deployed Application**: [https://courageous-meringue-e0dfb8.netlify.app](https://courageous-meringue-e0dfb8.netlify.app)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts library
- **Data Processing**: PapaParse for CSV handling
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd indian-unemployment-analysis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📊 Data Format

### CSV Upload Requirements

Your CSV file should contain the following columns (column names are flexible):

#### Required Columns:
- **Date/Year**: Format YYYY-MM or YYYY (e.g., "2024-01" or "2024")
- **Unemployment Rate**: Percentage value (e.g., 5.2)

#### Optional Columns:
- **State**: State name (defaults to "National" if not provided)
- **Region**: "Urban" or "Rural" (defaults to "Urban")
- **Population**: Total population number
- **Labor Force**: Total labor force number
- **Estimated Unemployed**: Number of unemployed people

#### Supported Column Name Variations:
- `unemployment_rate`, `Unemployment Rate`, `National_Unemployment_Rate (%)`
- `urban_unemployment_rate`, `Urban_Unemployment_Rate (%)`
- `rural_unemployment_rate`, `Rural_Unemployment_Rate (%)`
- `year`, `Year`, `date`, `Date`
- `state`, `State`
- `population`, `Population`

### Example CSV Structure:
```csv
Year,National_Unemployment_Rate (%),Urban_Unemployment_Rate (%),Rural_Unemployment_Rate (%)
2016,4.2,3.8,5.1
2017,4.5,4.1,5.3
2018,5.1,4.8,5.8
```

## 🎯 Key Insights

The dashboard reveals several important trends in Indian unemployment:

### 📈 COVID-19 Impact
- Unemployment rates peaked during 2020-2021
- Significant economic disruption during lockdown periods
- Gradual recovery observed from 2022 onwards

### 🏙️ Urban vs Rural Patterns
- Urban areas showed higher volatility
- Rural regions maintained more stable rates
- Different recovery patterns post-pandemic

### 🗺️ Regional Variations
- Significant differences between states
- Some states consistently outperform others
- Economic policy impacts visible in data

## 🔍 Usage Guide

### Dashboard Navigation
1. **Dashboard Tab**: View key metrics and interactive charts
2. **Data Table Tab**: Explore raw data with sorting and filtering
3. **Upload CSV Tab**: Import your own unemployment data

### Filtering Data
- Use the state dropdown to filter data by specific states
- Charts automatically update based on selected filters
- Data table supports sorting by any column

### Uploading Data
1. Navigate to the "Upload CSV" tab
2. Click the upload area or drag & drop your CSV file
3. Wait for processing confirmation
4. Switch to Dashboard to view your data

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── DataTable.tsx   # Interactive data table
│   ├── FileUpload.tsx  # CSV upload component
│   ├── MetricsCard.tsx # Statistics cards
│   ├── StateComparisonChart.tsx
│   └── TimeSeriesChart.tsx
├── data/               # Sample data
│   └── sampleData.ts
├── services/           # Data processing
│   └── dataService.ts
├── types/              # TypeScript definitions
│   └── index.ts
├── App.tsx            # Main application
└── main.tsx           # Entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Data Sources**: World Bank, CMIE (Centre for Monitoring Indian Economy), Indian Government Statistics
- **Design Inspiration**: Indian tricolor theme and modern dashboard patterns
- **Libraries**: Thanks to the open-source community for the amazing tools used in this project

## 📞 Support

If you encounter any issues or have questions:

1. Check the browser console for detailed error messages
2. Ensure your CSV file follows the required format
3. Verify file size is under 10MB
4. Open an issue on GitHub for bug reports

## 🔄 Updates

- **v1.0.0**: Initial release with core functionality
- **v1.1.0**: Enhanced CSV parsing and error handling
- **v1.2.0**: Added drag & drop file upload
- **v1.3.0**: Improved responsive design and mobile support

---

**Built BY ; Codewiser ❤️ for analyzing India's economic data**
