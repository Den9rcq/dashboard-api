import { injectable } from 'inversify'
import { Logger, ILogObj } from 'tslog'
import { ILogger } from "./logger.inteface";
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>

  constructor() {
    this.logger = new Logger<ILogObj>({
      prettyLogTimeZone: 'local',
      hideLogPositionForProduction: true,
    })
  }

  log(...args: unknown[]) {
    this.logger.info(...args)
  }

  error(...args: unknown[]) {
    this.logger.error(...args)
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args)
  }
}
