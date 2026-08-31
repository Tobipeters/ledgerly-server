import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    // verify if token is valid 
    try {
     const payload = this.jwtService.verify(token);
     request.userId = payload.userId;

    } catch (e) {
      Logger.error(e)
      throw new UnauthorizedException('Token not valid');
    }

    return true;
  }

  extractTokenFromRequest = (request: Request) => {
    return request.headers.authorization?.split(' ')[1];
  };
}
