import { ProjectUserService } from './services/project-user.service';
import { ProjectUser } from './project-user.entity';
import {ProjectUserController} from './controllers/project-user.controller'
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '../projects/projects.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser]), UserModule, forwardRef(() => ProjectModule)],
  providers: [ProjectUserService],
  controllers: [ProjectUserController],
  exports: [ProjectUserService]
})
export class ProjectUserModule {}
