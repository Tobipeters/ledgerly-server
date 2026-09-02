import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/schema/auth.schema';
import { TenantConnectionProvider } from 'src/providers/tenant-connection.provider';
import {
  RefreshToken,
  RefreshTokenSchema,
} from 'src/schema/refresh-token.schema';
import {
  ResetPasswordToken,
  ResetPasswordTokenSchema,
} from 'src/schema/reset-password.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
      { name: ResetPasswordToken.name, schema: ResetPasswordTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TenantConnectionProvider],
  exports: [AuthService, TenantConnectionProvider],
})
export class AuthModule {}
