import { IncidentStatus, IncidentType, Priority } from './incident';

export const incidentTypeLabels: Record<IncidentType, string> = {
  LOW_GENERATION: 'Baixa geracao',
  INVERTER_OFFLINE: 'Inversor offline',
  COMMUNICATION_FAILURE: 'Falha de comunicacao',
  GRID_VOLTAGE: 'Problema de tensao',
  BILLING_ISSUE: 'Problema de faturamento',
  OTHER: 'Outro'
};

export const priorityLabels: Record<Priority, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  CRITICAL: 'Critica'
};

export const statusLabels: Record<IncidentStatus, string> = {
  OPEN: 'Aberto',
  IN_PROGRESS: 'Em andamento',
  RESOLVED: 'Resolvido',
  CANCELED: 'Cancelado'
};

export const incidentTypeOptions = Object.entries(incidentTypeLabels).map(([value, label]) => ({
  value: value as IncidentType,
  label
}));

export const priorityOptions = Object.entries(priorityLabels).map(([value, label]) => ({
  value: value as Priority,
  label
}));

export const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({
  value: value as IncidentStatus,
  label
}));
