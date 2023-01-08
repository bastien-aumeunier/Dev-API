import { ProjectUser } from './../project-user.entity';
import { Injectable, UnauthorizedException, NotFoundException, ConflictException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateProjectUserDTO} from '../dto/project-user.dto';
import { UserService } from '../../users/services/users.services';
//import {ProjectService} from '../../projects/services/projects.services'



@Injectable()
export class ProjectUserService {
  constructor(
    @InjectRepository(ProjectUser) private ProjectUserRepository: Repository<ProjectUser>,
    private userService: UserService,
    //private projectService: ProjectService
  ) {}

  async getAllProjectsUsers(use: any) {
    if(use.role == "Employee"){
        const projet = await this.ProjectUserRepository.find({where: {userId: use.Id}})
        if(!projet){
          throw new NotFoundException()
        } else {
          return projet
        }
    } else if(use.role == "ProjectManager" || use.role == "Admin"){
      return await this.ProjectUserRepository.find()
    }
  }
  

  async getProjectUserById(use: any, id: string) {
    const project = await this.ProjectUserRepository.findOne({where: {id: id}})
    if(use.role == "Employee"){
      if(project.userId == use.id){
        return project
      } else {
        throw new NotFoundException()
      }
    } else if(use.role == "ProjectManager" || use.role == "Admin"){
      return project
    }
  }

  async createProject(use : any, projectUserDetails : CreateProjectUserDTO ){
    //const project = await this.projectService.getProjectById(use, projectUserDetails.projectId)
    const user = await this.userService.getById(projectUserDetails.userId)

    if (use.role != "ProjectManager" && use.role != "Admin") {
      throw new UnauthorizedException()
    }
    if(!user){
      throw new NotFoundException()
    } 
    // if(!project){
    //  throw new NotFoundException()
    //} 
    const allProjetUser = await this.ProjectUserRepository.find({where: {userId: user.id}})
    if (allProjetUser.length == 0) {
      const ProjectUser = this.ProjectUserRepository.create(projectUserDetails)
      await this.ProjectUserRepository.save(ProjectUser)
    } else {
      for (const element of allProjetUser) {
        if(!(projectUserDetails.startDate>element.endDate || projectUserDetails.endDate<element.startDate)){
          throw new ConflictException()
        } 
      }
      const ProjectUser = this.ProjectUserRepository.create(projectUserDetails)
      await this.ProjectUserRepository.save(ProjectUser)
    }     
  }
}
