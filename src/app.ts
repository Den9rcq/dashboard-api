import express, { Express } from 'express';
import { Server } from 'http';
import { json } from 'body-parser';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.inteface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilter(): void {
		this.app.use(this.exceptionFilter.catch.bind(this));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		this.server = this.app.listen(this.port);

		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
