import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
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

    @Get(':id')
  getTodoById(
    @Param('id') id: string  
  ): Todo   {
   return  this.todos.find(
       (todo : Todo) => todo.id === id);
  }
  

  @Delete('delete/:id')
  DeletById(
    @Param('id') id:string)
    : String {
    const todo = this.todos.find((todo: Todo) => todo.id === id);
    const todoId = this.todos.findIndex((todo: Todo) => todo.id === id);
    if (todoId > 0) {
      this.todos.splice(todoId, 1);
      return 'le todo a ete supprimer avec succée ';
    } else {
      return  "le todo n existe pas";
    }
  }

  @Put('update/:id')
  ModifierTodo(@Param('id') id, 
  @Body() todoData)
  : Todo{
    const todo = this.todos.find((todo : Todo) => todo.id === id);

    const {name, description,date} = todoData;
    
      todo.name = name;
      todo.description=description;
    
    return todo;

  }
  

  @Patch('updatePartie/:id')
  ModifierPartieTodo(@Param('id') id, @Body() todoData: Partial<Todo>) : Todo{
 
    const todo = this.todos.find((todo : Todo) => todo.id === id);
    const {name, description,date} = todoData;
    if (todo.name != name){
       todo.name=name;
    }
    if (todo.description != description){
      todo.description = description;
    }
   return todo;
  }
}
