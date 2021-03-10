import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { Todo } from './models/todo';
import { v4 as uuidv4 } from 'uuid';
import { TodoStatusEnum } from './enums/TodoStatusEnum';
import { addTODO } from './DTO/addTODO';
import { patchTODO } from './DTO/patchTODO';
import { todoService } from 'src/todoService/todoService.service';


@Controller('todo')
export class TodoController {

  constructor(private todoService: todoService) {
  }

  todos: Todo [] = []; // creation objet todos de type tableau destodo qui est vide au départ

  @Get('')
  getTodos(@Req() req:Request ): Todo[] {
    console.log(req);
    return this.todos;
  }
  @Post('Newtodo')
  addTodo(
    @Body() todoData: addTODO
  ): Todo {

    return this.todoService.addTodo(todoData);
  }
  @Get(':id')
  getTodoById(
    @Param('id') id: string  
  ): Todo   {
   return  this.todos.find(
       (todo : Todo) => todo.id === id);
  }
  @Delete('delete/:id')
  DeletTodoById(
    @Param('id') id:string): String {
    const todo = this.todos.find((todo: Todo) => todo.id === id);
    const todoIndex = this.todos.findIndex((todo: Todo) => todo.id === id);
    if (todoIndex > 0) {
      this.todos.splice(todoIndex, 1);
      return 'suppression valide ';
    } else {
      return  "todo n'existe pas";
    }

  }
  @Patch('update/:id')
  ModifierTodo(@Param('id') id, @Body() todoData : Partial<patchTODO>): Todo{
    const todo = this.todos.find((todo : Todo) => todo.id === id);
    if(todo != todoData){
      todo.name = todoData.name;
      todo.description=todoData.description;
    }
    return todo;

  }


  @Put('updatePartie/:id')
  ModifierPartieTodo(@Param('id') id, @Body() todoData:Partial<Todo>) : Todo{
    
    const todo = this.todos.find((todo : Todo) => todo.id === id);
    if (todo.name != todoData.name){
       todo.name=todoData.name;
    }
    if (todo.description != todoData.description){
      todo.description = todoData.description;
    }
   return todo;
  }
}
