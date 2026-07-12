import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployersPage from './pages/employers';
import PortfolioPage from './pages/portfolio';
import BlogPage from './pages/blog';
import BlogPostPage from './pages/blog-post';
import SpreadsheetAutomationPage from './pages/spreadsheet-automation';
import SoftwareOnDemandPage from './pages/software-on-demand';
import { ThemeProvider } from './components/theme-provider';
import ThemeToggle from './components/theme-toggle';
import './App.css'

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<EmployersPage />} />
              <Route path="/employers/portfolio" element={<PortfolioPage />} />
              <Route path="/spreadsheet-automation" element={<SpreadsheetAutomationPage />} />
              <Route path="/software-on-demand" element={<SoftwareOnDemandPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/post" element={<BlogPostPage />} />
          </Routes>
          <ThemeToggle />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
