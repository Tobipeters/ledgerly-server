import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product {
  @Prop({
    required: true,
  })
  name!: string;

  @Prop()
  description!: string;

  @Prop({ required: true })
  price!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
