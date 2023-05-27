import { BaseController } from "../common/base.controller";
import { NextFunction, Response, Request } from "express";
import { HttpError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.inteface";
import 'reflect-metadata';
import { IUserController } from "./users.controller.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/login', method: 'post', func: this.login },
      { path: '/register', method: 'post', func: this.register },
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, 'Ошибка авторизации', 'login'))
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register')
  }
}
