import * as dotenv from 'dotenv';
dotenv.config();

import bootstrapApp from './app';
import logger from './util/logger';

const runApp = async () => {
  const PORT = process.env.PORT || 9000;
  const app = await bootstrapApp();

  app.listen(PORT, () => logger.debug(`App is running on PORT: ${PORT}`));

  return app; 
}

(async () => await runApp())();
