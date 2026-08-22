import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class TenantMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
      throw new BadRequestException('X-TENANT-ID not provideed');
    }

    
    // adding tenantId to the request object
    req['tenantId'] = tenantId;
    next();
  }
}
 