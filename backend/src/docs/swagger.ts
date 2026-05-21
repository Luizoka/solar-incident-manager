export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Solar Incident Manager API',
    version: '1.0.0',
    description: 'API para gerenciamento de incidentes tecnicos em sistemas solares.'
  },
  servers: [{ url: 'http://localhost:3333' }],
  tags: [{ name: 'Incidents' }],
  paths: {
    '/api/incidents': {
      get: {
        tags: ['Incidents'],
        summary: 'Lista incidentes',
        parameters: [
          { name: 'status', in: 'query', schema: { type: 'string' } },
          { name: 'priority', in: 'query', schema: { type: 'string' } },
          { name: 'type', in: 'query', schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'Lista de incidentes' } }
      },
      post: {
        tags: ['Incidents'],
        summary: 'Cria um incidente',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateIncident' }
            }
          }
        },
        responses: { 201: { description: 'Incidente criado' }, 400: { description: 'Erro de validacao' } }
      }
    },
    '/api/incidents/{id}': {
      get: {
        tags: ['Incidents'],
        summary: 'Busca incidente por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Incidente encontrado' }, 404: { description: 'Nao encontrado' } }
      },
      put: {
        tags: ['Incidents'],
        summary: 'Atualiza um incidente',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateIncident' }
            }
          }
        },
        responses: { 200: { description: 'Incidente atualizado' } }
      },
      delete: {
        tags: ['Incidents'],
        summary: 'Remove um incidente',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 204: { description: 'Incidente removido' } }
      }
    },
    '/api/incidents/{id}/status': {
      patch: {
        tags: ['Incidents'],
        summary: 'Atualiza status do incidente',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { status: { $ref: '#/components/schemas/IncidentStatus' } },
                required: ['status']
              }
            }
          }
        },
        responses: { 200: { description: 'Status atualizado' } }
      }
    }
  },
  components: {
    schemas: {
      IncidentType: {
        type: 'string',
        enum: ['LOW_GENERATION', 'INVERTER_OFFLINE', 'COMMUNICATION_FAILURE', 'GRID_VOLTAGE', 'BILLING_ISSUE', 'OTHER']
      },
      Priority: {
        type: 'string',
        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
      },
      IncidentStatus: {
        type: 'string',
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CANCELED']
      },
      CreateIncident: {
        type: 'object',
        required: ['title', 'description', 'clientName', 'type', 'priority'],
        properties: {
          title: { type: 'string', example: 'Inversor offline' },
          description: { type: 'string', example: 'Inversor sem comunicacao desde ontem.' },
          clientName: { type: 'string', example: 'Joao da Silva' },
          unitCode: { type: 'string', example: '3020547862' },
          type: { $ref: '#/components/schemas/IncidentType' },
          priority: { $ref: '#/components/schemas/Priority' }
        }
      },
      UpdateIncident: {
        allOf: [{ $ref: '#/components/schemas/CreateIncident' }]
      }
    }
  }
};
