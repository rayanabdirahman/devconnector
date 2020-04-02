import "reflect-metadata";
import { Container } from 'inversify';
import { RegistrableController } from './api/registrable.controller';
import TYPES from './types';
import UserController from './api/user/user.controller';
import { UserService, UserServiceImpl } from "./services/user.service";
import { UserRepository, UserRepositoryImpl } from "./data_access/repositories/user.repository";
import AccountController from "./api/account/account.controller";
import { AccountService, AccountServiceImpl } from "./services/account.service";
import ProfileController from "./api/profile/prodile.controller";

const container = new Container();

// controllers
container.bind<RegistrableController>(TYPES.Controller).to(UserController)
container.bind<RegistrableController>(TYPES.Controller).to(AccountController)
container.bind<RegistrableController>(TYPES.Controller).to(ProfileController)

// servies
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<AccountService>(TYPES.AccountService).to(AccountServiceImpl);

// repository
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

export default container;
