import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { createUserDto } from '../dto/create.user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() body: createUserDto) {
    return await this.usersService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(Number(id));
    return 'success';
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body) {
    return await this.usersService.update(Number(id), body);
  }
}
