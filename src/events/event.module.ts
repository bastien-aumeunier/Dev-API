import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventServices } from './services/event.service'
import { EventController } from './controllers/event.controller';
import { UserModule } from '../users/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Event]), UserModule],
  providers: [EventServices],
  controllers: [EventController],
  exports: [EventServices],
})
export class EventModule {}
