// import metadata for es7 decorators support
import 'reflect-metadata';

// allow creation of aliases for directories
import 'module-alias/register';

import http from 'http';
import env from '@app/common/config/env';
import logger from '@app/common/services/logger/logger';
import { App } from './app';

const start = async () => {
  try {
    const app = new App().getServer().build();

    // expose index endpoint
    app.get('/', (req, res) => {
      res.status(200).send('Up and running');
      logger.logAPIResponse(req, res);
    });

    // 404 route handler
    app.use((req, res, next) => {
      res.status(404).send("Whoops! Route doesn't exist.");
      logger.logAPIResponse(req, res);
    });

    const httpServer = http.createServer(app);

    // start server
    httpServer.listen(env.port);
    httpServer.on('listening', () =>
      logger.message(`🚀  ${env.service_name} listening on ` + env.port),
    );
  } catch (err) {
    logger.error(err, 'Fatal server error');
  }
};

start();
