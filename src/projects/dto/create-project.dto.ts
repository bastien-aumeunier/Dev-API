import { IsNotEmpty, MinLength, IsUUID } from "class-validator"

export class CreateProjectDTO {
  @IsNotEmpty()
  @MinLength(3)
  readonly name: string
  @IsNotEmpty()
  @IsUUID()
  readonly referringEmployeeId: string
}
