import {
  BadRequestException,
  NestMiddleware,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string | undefined;
    if (!tenantId) {
      throw new BadRequestException('X-TENANT-ID not provideed');
    }

    // Check if tenant existing in the db.
    const existingTenant = await this.authService.getTenantById(tenantId);
    if (!existingTenant) {
      throw new NotFoundException('Tenant does not exist');
    }

    // adding tenantId to the request object
    req['tenantId'] = tenantId;
    next();
  }
}
