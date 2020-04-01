import express from 'express';
import { RegistrableController } from './api/registrable.controller';
import container from './inversify.config';
import TYPES from './types';
import logger from './util/logger';

export default (): Promise<express.Application> => {
  return new Promise<express.Application>(async (resolve, reject) => {
    try {
      const app = express();

      // middleware
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      
      app.get('/', async (req: express.Request, res: express.Response): Promise<express.Response> => {
        return res.send({"Devconnector APP": "HELLO WORLD"})
      });

      app.get('/api', async (req: express.Request, res: express.Response): Promise<express.Response> => {
        return res.send({"Devconnector API": "Version 1"})
      });

      // register api routes
      const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
      controllers.forEach(controller => controller.registerRoutes(app));
      
      resolve(app);

    } catch (error) {
      logger.error('Error: ', error)
      reject(error);
    }
  })
};