import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/schema/auth.schema';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  constructor(@InjectModel(Auth.name) private AuthModel: Model<Auth>) {}

  async createTenant(payload: RegisterDto) {
    const { email, password, ...rest } = payload;
    // Check if tenant with that email exist

    const existingTenant = await this.AuthModel.findOne({
      email,
    });

    if (existingTenant) {
      throw new ConflictException('Tenant already exist');
    }

    try {
      // Encrypt password
      const encryptedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

      // Proceed if it is a new email
      const tenant = await this.AuthModel.create({
        ...rest,
        email,
        password: encryptedPassword,
      });

      //  Test that tenant creation works
      return tenant;
    } catch (err) {
      throw new InternalServerErrorException(
        `An error occured during registration - ${err}`,
      );
    }
  }
}
