import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { RolesGuard } from 'src/auth/role/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin)
  async getUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('count')
  async getUserCount(): Promise<number> {
    return this.usersService.getUserCount();
  }
}
