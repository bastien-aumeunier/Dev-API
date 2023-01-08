import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseGuards, Request, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { UserService } from '../services/users.services';
import {CreateUserDTO} from '../dto/create-user.dto'
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guards';
import { LoginUserDTO } from '../dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly UsersService: UserService, 
    private readonly authService: AuthService
    ) {}

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  postUser( @Body() user: CreateUserDTO) {
    return this.UsersService.createUser(user);
  }

  
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() log: LoginUserDTO,@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }
  
  
  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.UsersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', new ParseUUIDPipe()) id: string){
    return this.UsersService.getById(id) 
  }
}


