import { env } from './config/env';
import { app } from './app';
import { logger } from './logs/logger';

app.listen(env.port, () => {
  logger.info(`API running on port ${env.port}`);
});
