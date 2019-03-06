import { Request, Response, NextFunction } from 'express';
import logger from '@app/common/services/logger/logger';

/**
 * Express Middleware that logs incoming HTTP requests.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  logger.logAPIRequest(req);
  next();
};
