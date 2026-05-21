import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import {
  CreateIncidentInput,
  IncidentFilters,
  IncidentStatus,
  UpdateIncidentInput
} from '../validations/incidentSchemas';

export class IncidentRepository {
  list(filters: IncidentFilters) {
    return prisma.incident.findMany({
      where: filters,
      orderBy: [{ createdAt: 'desc' }]
    });
  }

  findById(id: string) {
    return prisma.incident.findUnique({ where: { id } });
  }

  create(data: CreateIncidentInput) {
    return prisma.incident.create({ data });
  }

  update(id: string, data: UpdateIncidentInput) {
    return prisma.incident.update({
      where: { id },
      data: data as Prisma.IncidentUpdateInput
    });
  }

  updateStatus(id: string, status: IncidentStatus) {
    return prisma.incident.update({
      where: { id },
      data: {
        status,
        resolvedAt: status === 'RESOLVED' ? new Date() : null
      }
    });
  }

  delete(id: string) {
    return prisma.incident.delete({ where: { id } });
  }
}
