import { Body, Controller, Get, Post } from '@nestjs/common';
import { Todo } from './models/todo';
import { v4 as uuidv4 } from 'uuid';
import { TodoStatusEnum } from './enums/TodoStatusEnum';


@Controller('todo')
export class TodoController {

    todos: Todo [] = [];
    @Get('')
    getTodos() : Todo[] {
      return this.todos;
    }

    @Post()
    addTodo(
     @Body() todoData
    ): Todo {
      console.log(todoData);
      const {name, description} = todoData;
    
      const todo = new Todo();
      todo.description = description;
      todo.name = name;
      todo.date = new Date();
      todo.status = TodoStatusEnum.waiting;
      todo.id = uuidv4();
      this.todos.push(todo);
      return todo;
    }
}
