import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/databaseConfig';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config, databaseConfig], // load all the config you want to be able to globally access
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService)=>({
        secret: configService.get<string>('jwtSecret')
      }),
      global: true,
      inject: [ConfigService]
    }),
    ProductModule,
    AuthModule,
  ], 

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
