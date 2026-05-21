import { Filter, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteIncident, listIncidents } from '../api/incidents';
import { PriorityBadge, StatusBadge } from '../components/Badge';
import { Incident, IncidentFilters } from '../types/incident';
import {
  incidentTypeLabels,
  incidentTypeOptions,
  priorityOptions,
  statusOptions
} from '../types/options';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(value));
}

export function DashboardPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filters, setFilters] = useState<IncidentFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadIncidents(nextFilters = filters) {
    try {
      setIsLoading(true);
      setError('');
      const data = await listIncidents(nextFilters);
      setIncidents(data);
    } catch {
      setError('Nao foi possivel carregar os incidentes.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadIncidents();
  }, []);

  function updateFilter<Key extends keyof IncidentFilters>(key: Key, value: string) {
    const nextFilters: IncidentFilters = {
      ...filters,
      [key]: value ? (value as IncidentFilters[Key]) : undefined
    };

    setFilters(nextFilters);
    void loadIncidents(nextFilters);
  }

  async function handleDelete(incident: Incident) {
    const confirmed = window.confirm(`Remover o incidente "${incident.title}"?`);

    if (!confirmed) {
      return;
    }

    await deleteIncident(incident.id);
    await loadIncidents();
  }

  return (
    <main className="app-shell">
      <section className="page-header page-header-row">
        <div>
          <p className="eyebrow">Operacao solar</p>
          <h1>Incidentes tecnicos</h1>
          <p>Registre falhas, acompanhe prioridades e mantenha o status operacional atualizado.</p>
        </div>

        <Link className="button button-primary" to="/incidents/new">
          <Plus size={18} />
          Novo incidente
        </Link>
      </section>

      <section className="content-panel">
        <div className="filters-bar">
          <span className="filters-title">
            <Filter size={17} />
            Filtros
          </span>

          <select
            value={filters.status ?? ''}
            onChange={(event) => updateFilter('status', event.target.value)}
          >
            <option value="">Todos os status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.priority ?? ''}
            onChange={(event) => updateFilter('priority', event.target.value)}
          >
            <option value="">Todas as prioridades</option>
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.type ?? ''}
            onChange={(event) => updateFilter('type', event.target.value)}
          >
            <option value="">Todos os tipos</option>
            {incidentTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button className="icon-button" type="button" onClick={() => loadIncidents()}>
            <RefreshCw size={17} />
            <span className="sr-only">Atualizar lista</span>
          </button>
        </div>

        {error && <p className="notice notice-error">{error}</p>}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Abertura</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7}>Carregando incidentes...</td>
                </tr>
              ) : incidents.length === 0 ? (
                <tr>
                  <td colSpan={7}>Nenhum incidente encontrado.</td>
                </tr>
              ) : (
                incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>
                      <Link className="table-link" to={`/incidents/${incident.id}`}>
                        {incident.title}
                      </Link>
                    </td>
                    <td>{incident.clientName}</td>
                    <td>{incidentTypeLabels[incident.type]}</td>
                    <td>
                      <PriorityBadge priority={incident.priority} />
                    </td>
                    <td>
                      <StatusBadge status={incident.status} />
                    </td>
                    <td>{formatDate(incident.createdAt)}</td>
                    <td>
                      <div className="table-actions">
                        <Link className="button" to={`/incidents/${incident.id}`}>
                          Ver
                        </Link>
                        <button
                          className="icon-button danger"
                          type="button"
                          onClick={() => handleDelete(incident)}
                        >
                          <Trash2 size={17} />
                          <span className="sr-only">Excluir incidente</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
