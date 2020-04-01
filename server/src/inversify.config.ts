import "reflect-metadata";
import { Container } from 'inversify';
import { RegistrableController } from './api/registrable.controller';
import TYPES from './types';
import UserController from './api/user/user.controller';

const container = new Container();

// controllers
container.bind<RegistrableController>(TYPES.Controller).to(UserController)

// servies

export default container;
