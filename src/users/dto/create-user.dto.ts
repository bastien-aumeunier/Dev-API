import { IsNotEmpty, IsString, IsOptional, IsEmail, MinLength } from "class-validator"

export class CreateUserDTO {
  @IsNotEmpty()
  @MinLength(3)
  readonly username: string
  @IsNotEmpty()
  @IsEmail()
  readonly email: string
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string
  @IsOptional()
  @IsString()
  readonly role: string
}
