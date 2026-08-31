import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty({ message: 'Organization name is required' })
  organizationName!: string;

  @IsString()
  description!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNummber!: string;

  @IsString()
  rcNumber!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    {
      message:
        'Password must contain at least one uppercase, one lowercase and one special character',
    },
  )
  password!: string;
}
