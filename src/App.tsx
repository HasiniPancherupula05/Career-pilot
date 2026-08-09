import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Logo } from './components/Logo';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Jobs } from './pages/Jobs';
import { JobDetails } from './pages/JobDetails';
import { Applications } from './pages/Applications';
import { CreateJob } from './pages/CreateJob';
import { EditJob } from './pages/EditJob';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen theme-bg flex flex-col font-sans antialiased selection:bg-[var(--primary)] selection:text-white transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/admin/jobs/new" element={<CreateJob />} />
              <Route path="/admin/jobs/edit/:id" element={<EditJob />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="theme-navbar py-8 text-center text-xs theme-text-muted mt-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Logo size="sm" showSubtitle={false} />
                <span>&bull; Job &amp; Application Platform</span>
              </div>
              <p className="text-[11px] theme-text-muted">
                Powered by Express REST API &amp; React Frontend. Dynamic theme engine active.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
