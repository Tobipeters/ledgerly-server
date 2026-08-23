import { Connection } from 'mongoose';
import { Product, ProductSchema } from 'src/modules/product/product.schema';

export const tenantModels = {
  productModel: {
    provide: 'PRODUCT_MODEL',
    useFactory: async (tenantConnection: Connection) => {
      // Used active collection - setup in TENANT_CONNECTION provider
      return tenantConnection.model(Product.name, ProductSchema);
    },
    inject: ['TENANT_CONNECTION'], // provider dependency => TENANT_CONNECTION has to run first
  },
};
