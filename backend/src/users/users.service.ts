import { Injectable } from '@nestjs/common';
import { User, PaginatedResponse } from './types/user.types';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = this.generateMockUsers();
  }

  getUsers(
    page: number,
    limit: number,
    search?: string,
  ): PaginatedResponse<User> {
    let filtered = this.users;

    const trimmed = search?.trim();
    if (trimmed) {
      const term = trimmed.toLowerCase();
      filtered = this.users.filter((user) =>
        user.name.toLowerCase().includes(term),
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const safePage = Math.min(page, totalPages || 1);
    const offset = (safePage - 1) * limit;
    const data = filtered.slice(offset, offset + limit);

    return {
      success: true,
      count: total,
      page: safePage,
      limit,
      totalPages,
      data,
    };
  }

  private generateMockUsers(): User[] {
    const users: User[] = [];
    for (let i = 1; i <= 5000; i++) {
      users.push({
        id: i.toString(),
        name: `User ${i}`,
        role: i % 3 === 0 ? 'Admin' : 'Member',
        status: i % 2 === 0 ? 'Active' : 'Offline',
        lastLogin: new Date(
          Date.now() - Math.random() * 10000000000,
        ).toISOString(),
      });
    }
    return users;
  }
}
