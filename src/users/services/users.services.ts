import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  {User} from '../user.entity';
import {CreateUserDTO} from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import Role from '../../role/role.enum';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return this.UserRepository.find();
  }

  async createUser(userDetails: CreateUserDTO) {
    const user = this.UserRepository.create(userDetails)
    if(!(user.role == "ProjectManager" || user.role == "Admin" || user.role == "Employee")){
      user.role = Role.Employee
    }
    user.password = await bcrypt.hash(user.password, 10)
    await this.UserRepository.save(user)
    const { password, ...result } = user;
    return result
  }

  async getById(id :string)  {
    const user = await this.UserRepository.findOne({where: {id: id}})
    if(!user){
      throw new NotFoundException()
    } else {
      return user
    }
        
  }
 
  async getByMail(mail: string) {
    return this.UserRepository.findOne({where: {email: mail}})
  }

  async getByUser(username: string) {
    return this.UserRepository.findOne({where: {username: username}})
  }


}
