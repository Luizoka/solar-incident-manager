import { api } from './http';
import {
  CreateIncidentPayload,
  Incident,
  IncidentFilters,
  IncidentStatus,
  UpdateIncidentPayload
} from '../types/incident';

export async function listIncidents(filters: IncidentFilters = {}) {
  const response = await api.get<Incident[]>('/api/incidents', { params: filters });
  return response.data;
}

export async function getIncident(id: string) {
  const response = await api.get<Incident>(`/api/incidents/${id}`);
  return response.data;
}

export async function createIncident(payload: CreateIncidentPayload) {
  const response = await api.post<Incident>('/api/incidents', payload);
  return response.data;
}

export async function updateIncident(id: string, payload: UpdateIncidentPayload) {
  const response = await api.put<Incident>(`/api/incidents/${id}`, payload);
  return response.data;
}

export async function updateIncidentStatus(id: string, status: IncidentStatus) {
  const response = await api.patch<Incident>(`/api/incidents/${id}/status`, { status });
  return response.data;
}

export async function deleteIncident(id: string) {
  await api.delete(`/api/incidents/${id}`);
}
