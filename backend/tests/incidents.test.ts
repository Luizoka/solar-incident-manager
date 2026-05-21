import request from 'supertest';
import { app } from '../src/app';

const validIncident = {
  title: 'Inversor offline',
  description: 'Inversor sem comunicacao desde ontem.',
  clientName: 'Joao da Silva',
  unitCode: '3020547862',
  type: 'INVERTER_OFFLINE',
  priority: 'HIGH'
};

describe('Incidents API', () => {
  it('creates an incident with valid data', async () => {
    const response = await request(app).post('/api/incidents').send(validIncident);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: validIncident.title,
      clientName: validIncident.clientName,
      status: 'OPEN'
    });
  });

  it('does not create an incident without title', async () => {
    const response = await request(app)
      .post('/api/incidents')
      .send({ ...validIncident, title: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Validation error');
  });

  it('lists incidents', async () => {
    await request(app).post('/api/incidents').send(validIncident);

    const response = await request(app).get('/api/incidents');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('finds an incident by id', async () => {
    const created = await request(app).post('/api/incidents').send(validIncident);

    const response = await request(app).get(`/api/incidents/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(created.body.id);
  });

  it('returns 404 for missing incident', async () => {
    const response = await request(app).get('/api/incidents/missing-id');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Incident not found');
  });

  it('updates status to resolved and fills resolvedAt', async () => {
    const created = await request(app).post('/api/incidents').send(validIncident);

    const response = await request(app)
      .patch(`/api/incidents/${created.body.id}/status`)
      .send({ status: 'RESOLVED' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('RESOLVED');
    expect(response.body.resolvedAt).toBeTruthy();
  });

  it('does not accept invalid status', async () => {
    const created = await request(app).post('/api/incidents').send(validIncident);

    const response = await request(app)
      .patch(`/api/incidents/${created.body.id}/status`)
      .send({ status: 'FINALIZADO' });

    expect(response.status).toBe(400);
  });

  it('deletes an incident', async () => {
    const created = await request(app).post('/api/incidents').send(validIncident);

    const response = await request(app).delete(`/api/incidents/${created.body.id}`);

    expect(response.status).toBe(204);
  });
});
