import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() product) {
    console.log({ product });
    return this.productService.createProduct(product);
  }

  @Get()
  getProducts() {
    return this.productService.getAllProducts();
  }
}
