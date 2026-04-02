import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import type { PaginatedResponse, User } from './types/user.types';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('page') pageParam?: string,
    @Query('limit') limitParam?: string,
    @Query('search') search?: string,
  ): PaginatedResponse<User> {
    const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(limitParam || '10', 10) || 10));

    return this.usersService.getUsers(page, limit, search);
  }
}
