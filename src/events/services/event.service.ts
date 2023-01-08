import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event, EventStatus, EventType } from '../event.entity';
import { UserService } from '../../users/services/users.services';
import { CreateEventDTO } from '../dto/event.dto';
import * as dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
import * as weekOfYear from "dayjs/plugin/weekOfYear";
import console from 'console';

dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

@Injectable()
export class EventServices {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository : Repository<Event>,
    private userService: UserService, 

  ){}

  async getAllEvents() {
    return await this.eventRepository.find()
  }

  async getEventById(id: string) {
    const event = await this.eventRepository.find({where: {id: id}})
    if(!event){
      throw new NotFoundException()
    } else {
      return event
    }
  }

  async getEventByUserId(id: string) {
    return await this.eventRepository.find({where: {userId: id}})
  }

  async createEvent(use: any, eventDetails: CreateEventDTO) {
    const userEvent = await this.getEventByUserId(use.id)
    let newEvent = new Event()
    newEvent.date = eventDetails.date
    newEvent.userId = use.id
    newEvent.eventDescription = eventDetails.eventDescription
    newEvent.eventStatus = EventStatus.PENDING
    if(eventDetails.eventType == "PAIDLEAVE"){
      newEvent.eventType = EventType.PAIDLEAVE
    } else {
      newEvent.eventType = EventType.REMOTEWORK
    }
    userEvent.forEach(event => {
      if(eventDetails.date == event.date){
        throw new UnauthorizedException()
      }
    })
    if(newEvent.eventType == EventType.PAIDLEAVE){
        let event = this.eventRepository.create(newEvent)
        await this.eventRepository.save(event)
        return event
    } else {
        let countremote = 0
        const weekEvent = dayjs(newEvent.date).week()
        userEvent.forEach(event => {
          if(dayjs(event.date).week() == weekEvent){
            countremote++
          }
        })
        if(countremote >= 2){
          throw new UnauthorizedException()
        } else {
          let event = this.eventRepository.create(newEvent)
          await this.eventRepository.save(event)
          return event
        }
      }
    }
}

