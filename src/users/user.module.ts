import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/users.services';
import { UserController } from './controllers/users.controllers';
import {User}  from './user.entity';
import { forwardRef } from '@nestjs/common/utils';




@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(()=> AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
