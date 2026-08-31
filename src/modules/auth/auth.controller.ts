import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() payload) {
    return this.authService.createTenant(payload);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(@Body() payload: RefreshTokenDto) {
    return this.authService.refreshToken(payload.refreshToken);
  }
}
