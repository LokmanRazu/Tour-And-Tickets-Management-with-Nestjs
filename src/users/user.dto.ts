import { OmitType } from "@nestjs/swagger"
import { IsNotEmpty, IsEmail, IsStrongPassword } from "class-validator"
export class UserDTO {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string
};

export class LoginDTO extends OmitType(UserDTO, ['name'] as const){
    
}
