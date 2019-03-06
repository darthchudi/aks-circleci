import express, { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import responseTime from 'response-time';
import requestID from 'express-request-id';
import loggerMiddleware from './middlewares/requestLogger';

import container from '@app/common/config/ioc';

import jsend from './middlewares/jsend';

export class App {
  private server: InversifyExpressServer;
  constructor() {
    this.server = new InversifyExpressServer(container);

    //setup server-level middlewares
    this.server.setConfig((app: Application) => {
      app.disable('x-powered-by');
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));

      // add x-response-time to headers
      app.use(responseTime());

      // add request ID header to request
      app.use(requestID());

      // log requests
      app.use(loggerMiddleware);

      //enable jsend
      app.use(jsend);
    });
  }

  getServer = () => this.server;
}
