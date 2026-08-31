import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get()
  getProducts() {
    return this.productService.getAllProducts();
  }
}
