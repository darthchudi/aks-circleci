import bunyan from 'bunyan';
import { Request, Response } from 'express';
import { reqSerializer } from './serializers';
import env from '@app/common/config/env';

interface ILogger {
  error(err: Error, message?: any);
  message(message: any);
  logAPIRequest(req: Request);
  logAPIResponse(req: Request, res: Response);
  logAPIError(req: Request, res: Response, err: Error);
}

class Logger implements ILogger {
  private log: bunyan;
  constructor(name: string = env.service_name) {
    this.log = bunyan.createLogger({
      name,
      serializers: {
        err: bunyan.stdSerializers.err,
        res: bunyan.stdSerializers.res,
        req: reqSerializer,
      },
    });
  }

  /**
   * Logs an error along with information describing the
   * error.
   * @param err Error object
   * @param message Additional information about the error.
   */
  error(err: Error, message?: any) {
    this.log.error({ err }, message);
  }

  /**
   * Logs arbitrary data
   * @param message Arbitrary data to be logged
   */
  message(message: any) {
    this.log.info(message);
  }

  /**
   * Logs an incoming HTTP request
   * @param req Express request
   */
  logAPIRequest(req: Request) {
    this.log.info({ req });
  }

  /**
   * Logs an outgoing HTTP response
   * @param req Express request
   * @param res Express responser
   */
  logAPIResponse(req: Request, res: Response) {
    this.log.info({
      res,
      request_id: req.id,
    });
  }

  /**
   * Logs an error that occured during an operation
   * initiated via a HTTP request
   * @param req Express request
   * @param res Express responser
   * @param err Error object
   */
  logAPIError(req: Request, res: Response, err: Error) {
    this.log.error({
      err,
      res,
      request_id: req.id,
    });
  }
}

export default new Logger();
