import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteIncident, getIncident, updateIncident, updateIncidentStatus } from '../api/incidents';
import { PriorityBadge, StatusBadge } from '../components/Badge';
import { IncidentForm } from '../components/IncidentForm';
import { Incident, IncidentStatus } from '../types/incident';
import { incidentTypeLabels, statusOptions } from '../types/options';
import { IncidentFormData } from '../validations/incidentSchema';

function formatDate(value?: string | null) {
  if (!value) {
    return 'Nao informado';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(value));
}

export function IncidentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [status, setStatus] = useState<IncidentStatus>('OPEN');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadIncident() {
      if (!id) {
        return;
      }

      try {
        const data = await getIncident(id);
        setIncident(data);
        setStatus(data.status);
      } finally {
        setIsLoading(false);
      }
    }

    void loadIncident();
  }, [id]);

  async function handleUpdate(data: IncidentFormData) {
    if (!incident) {
      return;
    }

    const updated = await updateIncident(incident.id, data);
    setIncident(updated);
    setMessage('Incidente atualizado.');
  }

  async function handleStatusUpdate() {
    if (!incident) {
      return;
    }

    const updated = await updateIncidentStatus(incident.id, status);
    setIncident(updated);
    setStatus(updated.status);
    setMessage('Status atualizado.');
  }

  async function handleDelete() {
    if (!incident) {
      return;
    }

    const confirmed = window.confirm(`Remover o incidente "${incident.title}"?`);

    if (!confirmed) {
      return;
    }

    await deleteIncident(incident.id);
    navigate('/');
  }

  if (isLoading) {
    return (
      <main className="app-shell">
        <section className="content-panel">Carregando incidente...</section>
      </main>
    );
  }

  if (!incident) {
    return (
      <main className="app-shell">
        <section className="content-panel">Incidente nao encontrado.</section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="page-header compact-header">
        <Link className="back-link" to="/">
          <ArrowLeft size={17} />
          Voltar
        </Link>
        <div className="detail-heading">
          <div>
            <p className="eyebrow">{incidentTypeLabels[incident.type]}</p>
            <h1>{incident.title}</h1>
          </div>
          <div className="status-stack">
            <PriorityBadge priority={incident.priority} />
            <StatusBadge status={incident.status} />
          </div>
        </div>
      </section>

      <section className="detail-layout">
        <div className="content-panel">
          <h2>Dados do incidente</h2>
          {message && <p className="notice notice-success">{message}</p>}
          <IncidentForm
            submitLabel="Salvar alteracoes"
            initialValues={{
              title: incident.title,
              description: incident.description,
              clientName: incident.clientName,
              unitCode: incident.unitCode ?? '',
              type: incident.type,
              priority: incident.priority
            }}
            onSubmit={handleUpdate}
          />
        </div>

        <aside className="content-panel side-panel">
          <h2>Status</h2>
          <label className="status-control">
            Atual
            <select value={status} onChange={(event) => setStatus(event.target.value as IncidentStatus)}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button className="button button-primary full-width" type="button" onClick={handleStatusUpdate}>
            <Save size={17} />
            Atualizar status
          </button>

          <dl className="meta-list">
            <div>
              <dt>Cliente</dt>
              <dd>{incident.clientName}</dd>
            </div>
            <div>
              <dt>Unidade</dt>
              <dd>{incident.unitCode || 'Nao informada'}</dd>
            </div>
            <div>
              <dt>Criado em</dt>
              <dd>{formatDate(incident.createdAt)}</dd>
            </div>
            <div>
              <dt>Atualizado em</dt>
              <dd>{formatDate(incident.updatedAt)}</dd>
            </div>
            <div>
              <dt>Resolvido em</dt>
              <dd>{formatDate(incident.resolvedAt)}</dd>
            </div>
          </dl>

          <button className="button button-danger full-width" type="button" onClick={handleDelete}>
            <Trash2 size={17} />
            Excluir incidente
          </button>
        </aside>
      </section>
    </main>
  );
}
