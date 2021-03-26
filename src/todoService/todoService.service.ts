import { TodoStatusEnum } from 'src/todo/enums/TodoStatusEnum';


import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


import { Todo } from 'src/todo/models/todo';
import { UpdateTodoDto } from 'src/todo/DTO/updateTODO';
import { AddTodoDto } from 'src/todo/DTO/addTODO';


@Injectable()
export class TodoService {
  
  todos: Todo [] = [];

  searchTodo(id): Todo {
    const todo: Todo =  this.todos.find(
      (todo) => todo.id === id
    );
    if (!todo) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todoData: AddTodoDto) {
    // Destructring
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

  getTodoById(id: string): Todo {
    return this.searchTodo(id);
  }

  deleteTodo(id: string): {message: string} {
    const size = this.todos.length;
    this.todos = this.todos.filter(
      (todo) => todo.id != id
    );
    if (size === this.todos.length) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return {message: `le todo d'id ${id} a été supprimé avec succès`};
  }

  patchTodo(id: string, newTodo: Partial<UpdateTodoDto>): Todo {
    const todo = this.searchTodo(id);
    todo.description = newTodo.description ?? todo.description;
    todo.name = newTodo.name ?? todo.name;
    todo.status = newTodo.status ?? todo.status;
    return todo;
  }

  putTodo(id: string, newTodo: UpdateTodoDto): Todo {
    const todo = this.searchTodo(id);
    todo.description = newTodo.description;
    todo.name = newTodo.name;
    todo.status = newTodo.status;
    return todo;
  }

  
}