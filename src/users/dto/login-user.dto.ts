import { IsNotEmpty, IsEmail} from "class-validator"

export class LoginUserDTO {
  @IsEmail()
  readonly email: string
  @IsNotEmpty()
  readonly password: string
}
