import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import {  MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TenantMiddleware } from 'src/middlewares/tenant.middleware';
import { TenantConnectionProvider } from 'src/providers/tenant-connection.provider';
import { tenantModels } from 'src/providers/tenant-models.provider';

@Module({
  // imports: [
  //   MongooseModule.forFeature([
  //     {
  //       name: Product.name,
  //       schema: ProductSchema,
  //     },
  //   ]),
  // ],
  controllers: [ProductController],
  providers: [
    ProductService,
    TenantConnectionProvider,
    tenantModels.productModel,
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes(ProductController);
  }
}
