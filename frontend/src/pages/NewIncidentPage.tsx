import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createIncident } from '../api/incidents';
import { IncidentForm } from '../components/IncidentForm';
import { IncidentFormData } from '../validations/incidentSchema';

export function NewIncidentPage() {
  const navigate = useNavigate();

  async function handleSubmit(data: IncidentFormData) {
    const incident = await createIncident(data);
    navigate(`/incidents/${incident.id}`);
  }

  return (
    <main className="app-shell">
      <section className="page-header compact-header">
        <Link className="back-link" to="/">
          <ArrowLeft size={17} />
          Voltar
        </Link>
        <h1>Novo incidente</h1>
        <p>Preencha os dados iniciais para abrir um acompanhamento tecnico.</p>
      </section>

      <section className="content-panel narrow-panel">
        <IncidentForm submitLabel="Salvar incidente" onSubmit={handleSubmit} />
      </section>
    </main>
  );
}
