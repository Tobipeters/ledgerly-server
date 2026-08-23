import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Product description is required' })
  description!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Product price is required' })
  price!: number;
}
