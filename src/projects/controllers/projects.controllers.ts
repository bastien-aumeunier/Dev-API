import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guards';
import { CreateProjectDTO } from './../dto/create-project.dto';
import { Controller, Get, Post, Body, UseGuards, UsePipes, ValidationPipe,Param, ParseUUIDPipe } from '@nestjs/common';
import { ProjectService } from '../services/projects.services';
import { Req } from '@nestjs/common/decorators';
import { ProjectUserService } from '../../project-users/services/project-user.service';
import { UserService } from '../../users/services/users.services';


@Controller('projects')
export class ProjectController {
  constructor(
    private readonly ProjectsService: ProjectService,
    
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllProjectsEmployee(@Req() req : any) {
      return this.ProjectsService.getAllProjects(req.user)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getProjectsEmployeeById(@Req() req : any, @Param('id', new ParseUUIDPipe()) id: string) {
      return this.ProjectsService.getProjectById(req.user, id)
    }
    


    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    postProject(@Req() req : any,@Body() project: CreateProjectDTO) {
      return this.ProjectsService.createProject(req.user, project)
    }
  }
