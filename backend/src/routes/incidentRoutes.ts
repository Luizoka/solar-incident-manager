import { Router } from 'express';
import { IncidentController } from '../controllers/incidentController';
import { asyncHandler } from '../utils/asyncHandler';
import { validateBody, validateQuery } from '../middlewares/validate';
import {
  createIncidentSchema,
  incidentFiltersSchema,
  updateIncidentSchema,
  updateIncidentStatusSchema
} from '../validations/incidentSchemas';

const routes = Router();
const controller = new IncidentController();

routes.get('/', validateQuery(incidentFiltersSchema), asyncHandler(controller.list));
routes.get('/:id', asyncHandler(controller.show));
routes.post('/', validateBody(createIncidentSchema), asyncHandler(controller.create));
routes.put('/:id', validateBody(updateIncidentSchema), asyncHandler(controller.update));
routes.patch(
  '/:id/status',
  validateBody(updateIncidentStatusSchema),
  asyncHandler(controller.updateStatus)
);
routes.delete('/:id', asyncHandler(controller.delete));

export { routes as incidentRoutes };
