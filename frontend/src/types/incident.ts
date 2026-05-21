export type IncidentType =
  | 'LOW_GENERATION'
  | 'INVERTER_OFFLINE'
  | 'COMMUNICATION_FAILURE'
  | 'GRID_VOLTAGE'
  | 'BILLING_ISSUE'
  | 'OTHER';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELED';

export interface Incident {
  id: string;
  title: string;
  description: string;
  clientName: string;
  unitCode?: string | null;
  type: IncidentType;
  priority: Priority;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string | null;
}

export interface IncidentFilters {
  status?: IncidentStatus;
  priority?: Priority;
  type?: IncidentType;
}

export interface CreateIncidentPayload {
  title: string;
  description: string;
  clientName: string;
  unitCode?: string;
  type: IncidentType;
  priority: Priority;
}

export type UpdateIncidentPayload = Partial<CreateIncidentPayload>;
