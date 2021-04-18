import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { Todo } from './models/todo';
import { v4 as uuidv4 } from 'uuid';
import { TodoStatusEnum } from './enums/TodoStatusEnum';



import { AddTodoDto } from './DTO/addTODO';
import { TodoService } from 'src/todoService/todoService.service';
import { UpdateTodoDto } from './DTO/updateTODO';
import { ProcessTodoPipe } from './process-todo.pipe';
import { todoEntity } from './entities/todo.entity';
import { PatchTodoDto } from './DTO/patchTODO';


@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) {
  }

  todos: Todo [] = []; // creation objet todos de type tableau destodo qui est vide au départ

  
  @Get('')
  getTodos(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('nbre', new DefaultValuePipe(10)) nbre: number,
  ): Todo[] {
    console.log('page', page);
    console.log('nbre', nbre);
    return this.todoService.getTodos();
  }
  
  @Post()
  addTodo(
    @Body(ProcessTodoPipe) todoData: AddTodoDto
  ): Promise<todoEntity>{
    return this.todoService.addTodo(todoData);
  }

  @Get(':id')
  getTodoById(
    @Param('id') id: string
  ): Todo {
    return this.todoService.getTodoById(id);
  }

  @Delete(':id')
  deleteTodo(
    @Param('id') id: string
  ): Promise<unknown> {
    return this.todoService.deleteTodo(id);
  }

  @Delete('criteria')
  deleteTodoByCriteria(
    @Body('id') criterias: PatchTodoDto
  ): Promise<unknown> {
    return this.todoService.deleteTodoByCreterias(criterias);
  }
  @Put(':id')
  updateTodo(
    @Param('id')id : string,
    @Body() newTodo: PatchTodoDto
  ): Promise<todoEntity> {
    return this.todoService.putTodo(id, newTodo);
  }
  @Patch(':id')
  patchTodo(
    @Param('id')id : string,
    @Body() newTodo: Partial<UpdateTodoDto>
  ): Todo {
    return this.todoService.patchTodo(id, newTodo);
  }

  


}
