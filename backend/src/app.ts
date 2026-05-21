import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger';
import { errorHandler } from './middlewares/errorHandler';
import { incidentRoutes } from './routes/incidentRoutes';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/incidents', incidentRoutes);
app.use(errorHandler);
