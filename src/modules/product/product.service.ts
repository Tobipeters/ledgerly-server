import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  async createProduct(product) {
    console.log('Product in service', product);
    const newProduct = new this.ProductModel(product);
    return newProduct.save();
  }

  async getAllProducts() {
    return this.ProductModel.find();
  }
}
