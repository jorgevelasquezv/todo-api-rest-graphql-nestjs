import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Query('status') status?: string): Todo[] {
    return this.todoService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Todo {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
