import { ProjectController } from './controllers/projects.controllers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './services/projects.services';
import { Project } from './project.entity';
import { UserModule } from '../users/user.module';
import { forwardRef } from '@nestjs/common/utils';
import { ProjectUserModule } from '../project-users/project-user.module';


@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserModule,forwardRef(() =>ProjectUserModule)], 
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService]
})
export class ProjectModule {}
