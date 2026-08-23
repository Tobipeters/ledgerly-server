import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL') private ProductModel: Model<Product>,
  ) {}

  async createProduct(product: ProductDto) {
    const newProduct = new this.ProductModel(product);
    return newProduct.save();
  }

  async getAllProducts() {
    return this.ProductModel.find();
  }
}
