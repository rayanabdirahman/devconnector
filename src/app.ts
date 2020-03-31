import express from 'express';
import { RegistrableController } from './api/registrable.controller';
import container from './inversify.config';
import TYPES from './types';

export default (): Promise<express.Application> => {
  return new Promise<express.Application>(async (resolve, reject) => {
    try {
      const app = express();

      // middleware
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      
      app.get('/api', async (req: express.Request, res: express.Response): Promise<express.Response> => {
        return res.send({"hello": "world"})
      })

      // register api routes
      const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
      controllers.forEach(controller => controller.registerRoutes(app));
      
      resolve(app);

    } catch (error) {
      console.log('Error: ', error)
      reject(error);
    }
  })
};
