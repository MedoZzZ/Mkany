import { Routes, Route } from 'react-router-dom';
import ShellLayout from './layouts/ShellLayout';
import AgricultureDashboard from './pages/AgricultureDashboard';
import LegalWorkspace from './pages/LegalWorkspace';
import RealEstatePipeline from './pages/RealEstatePipeline';
import { I18nProvider } from './i18n/I18nContext';

function App() {
  return (
    <I18nProvider>
      <Routes>
      <Route path="/" element={<ShellLayout />}>
        <Route index element={
          <div style={{ padding: '40px', textAlign: 'center', color: '#E8EAED', fontFamily: 'system-ui, sans-serif' }}>
            <h2>Welcome to Mkani ERP</h2>
            <p>Select an application from the waffle menu above.</p>
          </div>
        } />
        <Route path="agriculture" element={<AgricultureDashboard />} />
        <Route path="legal" element={<LegalWorkspace />} />
        <Route path="real-estate" element={<RealEstatePipeline />} />
      </Route>
    </Routes>
    </I18nProvider>
  );
}

export default App;
