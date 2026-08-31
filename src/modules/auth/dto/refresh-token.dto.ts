import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsNotEmpty({message: 'Token is required'})
    @IsString()
    refreshToken!:string;
}