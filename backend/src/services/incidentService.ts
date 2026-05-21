import { Prisma } from '@prisma/client';
import { IncidentRepository } from '../repositories/incidentRepository';
import {
  CreateIncidentInput,
  IncidentFilters,
  IncidentStatus,
  UpdateIncidentInput
} from '../validations/incidentSchemas';
import { HttpError } from '../utils/httpError';
import { logger } from '../logs/logger';

const notFoundCode = 'P2025';

export class IncidentService {
  constructor(private readonly repository = new IncidentRepository()) {}

  list(filters: IncidentFilters) {
    return this.repository.list(filters);
  }

  async findById(id: string) {
    const incident = await this.repository.findById(id);

    if (!incident) {
      logger.error(`Failed to find incident - id=${id} error=Incident not found`);
      throw new HttpError(404, 'Incident not found');
    }

    return incident;
  }

  async create(data: CreateIncidentInput) {
    const incident = await this.repository.create(data);
    logger.info(`Incident created - id=${incident.id} clientName=${incident.clientName}`);
    return incident;
  }

  async update(id: string, data: UpdateIncidentInput) {
    try {
      const incident = await this.repository.update(id, data);
      logger.info(`Incident updated - id=${incident.id}`);
      return incident;
    } catch (error) {
      this.handlePrismaNotFound(error, id, 'update');
      throw error;
    }
  }

  async updateStatus(id: string, status: IncidentStatus) {
    const currentIncident = await this.findById(id);

    try {
      const incident = await this.repository.updateStatus(id, status);
      logger.info(
        `Incident status updated - id=${incident.id} from=${currentIncident.status} to=${incident.status}`
      );
      return incident;
    } catch (error) {
      this.handlePrismaNotFound(error, id, 'update status');
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.repository.delete(id);
      logger.info(`Incident removed - id=${id}`);
    } catch (error) {
      this.handlePrismaNotFound(error, id, 'delete');
      throw error;
    }
  }

  private handlePrismaNotFound(error: unknown, id: string, action: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === notFoundCode) {
      logger.error(`Failed to ${action} incident - id=${id} error=Incident not found`);
      throw new HttpError(404, 'Incident not found');
    }
  }
}
