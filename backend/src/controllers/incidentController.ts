import { Request, Response } from 'express';
import { IncidentStatus } from '@prisma/client';
import { IncidentService } from '../services/incidentService';
import { IncidentFilters } from '../validations/incidentSchemas';

const incidentService = new IncidentService();

export class IncidentController {
  async list(request: Request, response: Response) {
    const incidents = await incidentService.list(request.query as IncidentFilters);
    return response.json(incidents);
  }

  async show(request: Request, response: Response) {
    const incident = await incidentService.findById(request.params.id);
    return response.json(incident);
  }

  async create(request: Request, response: Response) {
    const incident = await incidentService.create(request.body);
    return response.status(201).json(incident);
  }

  async update(request: Request, response: Response) {
    const incident = await incidentService.update(request.params.id, request.body);
    return response.json(incident);
  }

  async updateStatus(request: Request, response: Response) {
    const incident = await incidentService.updateStatus(
      request.params.id,
      request.body.status as IncidentStatus
    );
    return response.json(incident);
  }

  async delete(request: Request, response: Response) {
    await incidentService.delete(request.params.id);
    return response.status(204).send();
  }
}
