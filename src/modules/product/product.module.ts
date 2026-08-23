import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TenantMiddleware } from 'src/middlewares/tenant.middleware';
import { tenantModels } from 'src/providers/tenant-models.provider';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    tenantModels.productModel,
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes(ProductController);
  }
}
