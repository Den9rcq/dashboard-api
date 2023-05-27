import { App } from "./app";
import { LoggerService } from './logger/logger.service'
import { UserController } from "./users/users.controller";
import { ExceptionFilter } from "./errors/exception.filter";
import { Container, ContainerModule, interfaces } from "inversify";
import { ILogger } from "./logger/logger.inteface";
import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { IUserController } from "./users/users.controller.interface";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App)
  bind<ILogger>(TYPES.ILogger).to(LoggerService)
  bind<IUserController>(TYPES.UserController).to(UserController)
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
})

function bootstrap() {
  const appContainer = new Container()
  appContainer.load(appBindings)
  const app = appContainer.get<App>(TYPES.Application)
  app.init()

  return { appContainer, app }
}

export const { app, appContainer } = bootstrap()
