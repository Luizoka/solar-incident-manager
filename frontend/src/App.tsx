import { Route, Routes } from 'react-router-dom';

function DashboardPlaceholder() {
  return (
    <main className="app-shell">
      <section className="page-header">
        <p className="eyebrow">Solar Incident Manager</p>
        <h1>Incidentes tecnicos</h1>
        <p>
          Interface para registrar, acompanhar e resolver incidentes em sistemas solares.
        </p>
      </section>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="*" element={<DashboardPlaceholder />} />
    </Routes>
  );
}
