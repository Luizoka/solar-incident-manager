import { z } from 'zod';

export const incidentTypeSchema = z.enum([
  'LOW_GENERATION',
  'INVERTER_OFFLINE',
  'COMMUNICATION_FAILURE',
  'GRID_VOLTAGE',
  'BILLING_ISSUE',
  'OTHER'
]);

export const prioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export const statusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CANCELED']);

export const createIncidentSchema = z.object({
  title: z.string().min(3, 'O titulo precisa ter pelo menos 3 caracteres.'),
  description: z.string().min(10, 'A descricao precisa ter pelo menos 10 caracteres.'),
  clientName: z.string().min(1, 'O cliente e obrigatorio.'),
  unitCode: z.string().optional(),
  type: incidentTypeSchema,
  priority: prioritySchema
});

export const updateIncidentSchema = createIncidentSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  'Informe pelo menos um campo para atualizacao.'
);

export const updateIncidentStatusSchema = z.object({
  status: statusSchema
});

export const incidentFiltersSchema = z.object({
  status: statusSchema.optional(),
  priority: prioritySchema.optional(),
  type: incidentTypeSchema.optional()
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;
export type UpdateIncidentInput = z.infer<typeof updateIncidentSchema>;
export type IncidentFilters = z.infer<typeof incidentFiltersSchema>;
export type IncidentStatus = z.infer<typeof statusSchema>;
