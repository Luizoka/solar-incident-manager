import { z } from 'zod';

export const incidentFormSchema = z.object({
  title: z.string().min(3, 'O titulo precisa ter pelo menos 3 caracteres.'),
  description: z.string().min(10, 'A descricao precisa ter pelo menos 10 caracteres.'),
  clientName: z.string().min(1, 'O cliente e obrigatorio.'),
  unitCode: z.string().optional(),
  type: z.enum([
    'LOW_GENERATION',
    'INVERTER_OFFLINE',
    'COMMUNICATION_FAILURE',
    'GRID_VOLTAGE',
    'BILLING_ISSUE',
    'OTHER'
  ], {
    errorMap: () => ({ message: 'Selecione um tipo de incidente valido.' })
  }),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], {
    errorMap: () => ({ message: 'Selecione uma prioridade valida.' })
  })
});

export type IncidentFormData = z.infer<typeof incidentFormSchema>;
