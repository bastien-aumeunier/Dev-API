import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateEventDTO {
  @IsNotEmpty()
  date: Date;

  eventDescription: string;

  @IsNotEmpty()
  eventType: string;

  @IsUUID()
  userId: string;
}
