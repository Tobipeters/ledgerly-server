import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAccessText(): string {
    return 'Access granted!';
  }
}
