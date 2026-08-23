import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/schema/auth.schema';
import { TenantConnectionProvider } from 'src/providers/tenant-connection.provider';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema, collection: 'tenants' },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TenantConnectionProvider],
  exports: [AuthService, TenantConnectionProvider]
})
export class AuthModule {}
