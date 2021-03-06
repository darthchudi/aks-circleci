import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import logger from '@app/common/services/logger/logger';
import env from '@app/common/config/env';

@controller('/hello')
export default class HelloController {
  @httpGet('')
  sayHello(req: Request, res: Response) {
    res.jSend.success({
      message: "I'm alive!",
      environment: env.app_env,
      name: env.service_name,
      port: env.port,
    });
    logger.logAPIResponse(req, res);
  }
}
