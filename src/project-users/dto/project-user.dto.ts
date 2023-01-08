import { IsNotEmpty, IsUUID, IsDate } from "class-validator"

export class CreateProjectUserDTO {
  //@IsDate()
  startDate: Date
  //@IsDate()
  endDate: Date
  @IsUUID()
  @IsNotEmpty()
  projectId: string
  @IsNotEmpty()
  @IsUUID()
  userId: string
}
