import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { IncidentDetailsPage } from './pages/IncidentDetailsPage';
import { NewIncidentPage } from './pages/NewIncidentPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/incidents/new" element={<NewIncidentPage />} />
      <Route path="/incidents/:id" element={<IncidentDetailsPage />} />
    </Routes>
  );
}
