import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import logger from '@app/common/services/logger/logger';
import env from '@app/common/config/env';

@controller('/hi')
export default class HiController {
  @httpGet('')
  sayHi(req: Request, res: Response) {
    res.jSend.success({
      message: "I'm a new feature! Hi!",
      environment: env.node_env,
      name: env.service_name,
      port: env.port,
    });
    logger.logAPIResponse(req, res);
  }
}
