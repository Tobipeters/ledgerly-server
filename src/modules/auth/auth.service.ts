import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/schema/auth.schema';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/schema/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  constructor(
    @InjectModel(Auth.name) private AuthModel: Model<Auth>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async createTenant(payload: SignUpDto) {
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
      const hashPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

      // Proceed if it is a new email
      const tenant = await this.AuthModel.create({
        ...rest,
        email,
        password: hashPassword,
      });

      //  Test that tenant creation works
      return tenant;
    } catch (err) {
      throw new InternalServerErrorException(
        `An error occured during registration - ${err}`,
      );
    }
  }

  async signIn(payload: SignInDto) {
    const { email, password } = payload;

    const userDetails = await this.AuthModel.findOne({ email });

    if (!userDetails) {
      throw new UnauthorizedException('Wrong credential');
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userDetails.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Email or Password is incorrect');
    }

    // Sign a Token for the user
    return this.generateUserTokens(userDetails._id);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3); //expires in 3 days

    await this.RefreshTokenModel.updateOne(
      {  userId },
      { $set: { expiryDate, token } },
      { upsert: true },
    );
  }

  async refreshToken(token: string) {
    // check that refresh token exist in the db
    const isTokenValid = await this.RefreshTokenModel.findOne({
      token,
      expiryDate: { $gte: new Date() }, // ...Is not greater than expiryDate in the db
    });

    if (!isTokenValid) {
      throw new BadRequestException('Invalid or expired refresh token');
    }

    return await this.generateUserTokens(isTokenValid.userId);
  }

  async getTenantById(tenantId: string) {
    return this.AuthModel.findOne({ id: tenantId });
  }
}
