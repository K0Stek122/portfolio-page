import { Routes, Route } from 'react-router-dom';
import EmployersPage from './pages/employers';
import PortfolioPage from './pages/portfolio';
import SpreadsheetAutomationPage from './pages/spreadsheet-automation';
import SoftwareOnDemandPage from './pages/software-on-demand';
import { ThemeProvider } from './components/theme-provider';
import ThemeToggle from './components/theme-toggle';
import './App.css'

function App() {

  return (
    <ThemeProvider>
        <Routes>
            <Route path="/" element={<EmployersPage />} />
            <Route path="/employers/portfolio" element={<PortfolioPage />} />
            <Route path="/spreadsheet-automation" element={<SpreadsheetAutomationPage />} />
            <Route path="/software-on-demand" element={<SoftwareOnDemandPage />} />
        </Routes>
        <ThemeToggle />
    </ThemeProvider>
  )
}

export default App;
