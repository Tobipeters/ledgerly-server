import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class SignInDto {
    @IsNotEmpty({message: 'Email is required'})
    @IsString()
    @IsEmail()
    email!:string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, {message: "Password must contain at least one number"})
    password!:string
}