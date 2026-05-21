import { Request, Response } from 'express';
import { IncidentService } from '../services/incidentService';
import { IncidentFilters, IncidentStatus } from '../validations/incidentSchemas';

const incidentService = new IncidentService();

function getIdParam(request: Request) {
  return String(request.params.id);
}

export class IncidentController {
  async list(request: Request, response: Response) {
    const incidents = await incidentService.list(request.query as IncidentFilters);
    return response.json(incidents);
  }

  async show(request: Request, response: Response) {
    const incident = await incidentService.findById(getIdParam(request));
    return response.json(incident);
  }

  async create(request: Request, response: Response) {
    const incident = await incidentService.create(request.body);
    return response.status(201).json(incident);
  }

  async update(request: Request, response: Response) {
    const incident = await incidentService.update(getIdParam(request), request.body);
    return response.json(incident);
  }

  async updateStatus(request: Request, response: Response) {
    const incident = await incidentService.updateStatus(
      getIdParam(request),
      request.body.status as IncidentStatus
    );
    return response.json(incident);
  }

  async delete(request: Request, response: Response) {
    await incidentService.delete(getIdParam(request));
    return response.status(204).send();
  }
}
