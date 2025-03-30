import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      return await this.prisma.todo_table.create({
        data: {
          task: createTodoDto.task,
          description: createTodoDto.description,
          complete: createTodoDto.completed,
        },
      });
    } catch (e) {
      return null;
    }
  }

  async findAll() {
    try {
      return await this.prisma.todo_table.findMany();
    } catch (e) {
      return null;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.todo_table.findUnique({ where: { id } });
    } catch (e) {
      return null;
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.prisma.todo_table.update({
        where: { id },
        data: updateTodoDto,
      });
    } catch (e) {
      return null;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.todo_table.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }
}
