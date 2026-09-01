import { Routes, Route } from 'react-router-dom';
import EmployersPage from './pages/employers';
import PortfolioPage from './pages/portfolio';
import SpreadsheetAlternativePage from './pages/spreadsheet-alternative';
import SoftwareOnDemandPage from './pages/software-on-demand';
import WebsiteDevelopmentPage from './pages/website-development';
import { ThemeProvider } from './components/theme-provider';
import ThemeToggle from './components/theme-toggle';
import './App.css'

function App() {

  return (
    <ThemeProvider>
        <Routes>
            <Route path="/" element={<EmployersPage />} />
            <Route path="/employers/portfolio" element={<PortfolioPage />} />
            <Route path="/spreadsheet-alternative" element={<SpreadsheetAlternativePage />} />
            <Route path="/software-on-demand" element={<SoftwareOnDemandPage />} />
            <Route path="/website-development" element={<WebsiteDevelopmentPage />} />
        </Routes>
        <ThemeToggle />
    </ThemeProvider>
  )
}

export default App;
