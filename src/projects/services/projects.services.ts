import { CreateProjectDTO } from './../dto/create-project.dto';
import { Injectable, UnauthorizedException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { UserService } from '../../users/services/users.services';
import { ProjectUserService } from '../../project-users/services/project-user.service';
@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project) private ProjectRepository: Repository<Project>,
    private userService: UserService, 
    private projectUserService: ProjectUserService
  ) {}

  async getAllProjects(use: any) {
    if(use.role == "Admin" || use.role == "ProjectManager"){
      return await this.ProjectRepository.find()
    } else {
      const projectUSer = await this.projectUserService.getAllProjectsUsers(use)
      console.log(projectUSer)
      const test = await Promise.all( projectUSer.map(projectUser => this.getdirectId(projectUser.projectId)))
      console.log(test)
      return test
    }
  }

  async getdirectId(id: string){
    return await this.ProjectRepository.findOne({where: {id: id}})
  }

  async getProjectById(use: any, id : string){
    const projet = await this.ProjectRepository.findOne({where: {id: id}})
    if(!projet){
      throw new NotFoundException()
    } else {
      if(use.role == "Admin" || use.role == "ProjectManager"){
        console.log(projet)
        return projet
      } else {
        const projecUser = await this.getAllProjects(use);
        console.log(projecUser)
        let isFind = false
        projecUser.forEach(project => {
          if(project.id == projet.id){
            isFind = true
          }
        });
      if (!isFind) {
        throw new ForbiddenException();
      } else{
        return projet;
      }
      }
    }
  }

  async createProject(use: any, projectDetails : CreateProjectDTO ): Promise<Project>{
    if (use.role == "Employee" || use.role == "ProjectManager") {
      throw new UnauthorizedException()
    } else {
      const user = await this.userService.getById(projectDetails.referringEmployeeId)
      if(!user){
        throw new NotFoundException()
      } else if(user.role == "Employee"){
        throw new UnauthorizedException()
      }
      const project = this.ProjectRepository.create(projectDetails)
      await this.ProjectRepository.save(project)
      return project
    }




  }
}
