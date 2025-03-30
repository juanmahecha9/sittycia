import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    const data = this.todoService.create(createTodoDto);
    if (data === null) {
      new HttpException('No es posible crear la tarea', HttpStatus.CONFLICT);
    }
    return data;
  }

  @Get()
  findAll() {
    const data = this.todoService.findAll();
    if (data === null) {
      new HttpException(
        'No es posible encontrar las tareas',
        HttpStatus.CONFLICT,
      );
    }
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const data = this.todoService.findOne(+id);
    if (data === null) {
      new HttpException(
        'No es posible encontrar la tarea',
        HttpStatus.CONFLICT,
      );
    }
    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const data = this.todoService.update(+id, updateTodoDto);
    if (data === null) {
      new HttpException(
        'No es posible actualizar la tarea',
        HttpStatus.CONFLICT,
      );
    }
    return data;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const data = this.todoService.remove(+id);
    if (data === null) {
      new HttpException('No es posible eliminar la tarea', HttpStatus.CONFLICT);
    }
    return data;
  }
}
