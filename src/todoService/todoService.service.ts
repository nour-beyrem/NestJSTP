import { TodoStatusEnum } from 'src/todo/enums/TodoStatusEnum';


import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { addTODO } from 'src/todo/DTO/addTODO';
import { patchTODO } from 'src/todo/DTO/patchTODO';

import { Todo } from 'src/todo/models/todo';


@Injectable()
export class todoService {
  todos: Todo[] = [];
  searchTodo(id): Todo {
    const todo: Todo =  this.todos.find(
      (todo) => todo.id === id
    );
    if (!todo) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }


  addTodo(todoData: addTODO) {
    
    const {name, description} = todoData;

    const todo = new Todo();
    todo.description = description;
    todo.name = name;
    todo.date = new Date();
    todo.status = TodoStatusEnum.waiting;
    this.todos.push(todo);
    return todo;
  }
  patchTodo(id: string, newTodo: Partial<patchTODO>): Todo {
    const todo = this.searchTodo(id);
    todo.description = newTodo.description ?? todo.description;
    todo.name = newTodo.name ?? todo.name;
    
    return todo;
  }
}