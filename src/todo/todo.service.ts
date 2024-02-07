import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { toDos } from '../data/todo.data';

@Injectable()
export class TodoService {
  create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: toDos.length + 1,
      ...createTodoDto,
      completed: false,
    };
    toDos.push(todo);
    return todo;
  }

  findAll(status?: string): Todo[] {
    if (status !== undefined)
      return toDos.filter((todo) => todo.completed === (status === 'true'));
    return toDos;
  }

  findOne(id: number): Todo {
    const todo = toDos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return todo;
  }

  remove(id: number): void {
    this.findOne(id);
    toDos.splice(
      toDos.findIndex((todo) => todo.id === id),
      1,
    );
  }
}
