import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guards';
import { CreateEventDTO } from '../dto/event.dto';
import { Controller, Get, Post, Body, UseGuards, UsePipes, ValidationPipe,Param, ParseUUIDPipe } from '@nestjs/common';
import { EventServices } from '../services/event.service';
import { Req } from '@nestjs/common/decorators';

@Controller('events')
export class EventController {
  constructor(
    private readonly EventsService: EventServices,
  ) {}


@Get()
@UseGuards(JwtAuthGuard)
getAllEventsEmployee() {
  return this.EventsService.getAllEvents()
}

@Get(':id')
@UseGuards(JwtAuthGuard)
getEventsEmployeeById(@Param('id', new ParseUUIDPipe()) id: string) {
  return this.EventsService.getEventById(id)
}

@Post()
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
postEvent(@Req() req : any,@Body() event: CreateEventDTO) {
  return this.EventsService.createEvent(req.user, event)
}

}
