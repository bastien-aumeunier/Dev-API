import { Controller, Get, Post, Body, UseGuards, UsePipes, ValidationPipe, Param, ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guards';
import { ProjectUserService } from '../services/project-user.service';
import {CreateProjectUserDTO} from '../dto/project-user.dto';
import { Req } from '@nestjs/common/decorators';



@Controller('project-users')
export class ProjectUserController {
  constructor(
    private readonly ProjectUser: ProjectUserService
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllProjectsEmployee(@Req() req : any) {
    return this.ProjectUser.getAllProjectsUsers(req.user);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getProjectEmployee(@Req() req : any, @Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.ProjectUser.getProjectUserById(req.user, id);
    }

  
    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    postProject(@Req() req: any, @Body() project: CreateProjectUserDTO) {
      return this.ProjectUser.createProject(req.user,project);
    }
  }
