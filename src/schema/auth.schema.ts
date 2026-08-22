import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Auth {
  @Prop({
    type: String,
    default: () => randomUUID(),
    unique: true,
    index: true,
  })
  id!: string;

  @Prop({
    required: true,
  })
  organizationName!: string;

  @Prop()
  description!: string;

  @Prop({
    required: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  phoneNummber!: string;

  @Prop({
    required: true,
  })
  rcNumber!: string;

  @Prop({
    required: true,
    select: false,
  })
  password!: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
