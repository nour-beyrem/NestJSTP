import { TodoStatusEnum } from '../enums/TodoStatusEnum';
import { IsIn, IsNotEmpty } from 'class-validator';

import { AddTodoDto } from './addTODO';
import { ErrorMessgaes } from 'src/generics/error-message.common';


export class UpdateTodoDto extends AddTodoDto{
  @IsNotEmpty({
    message: ErrorMessgaes.isEmptyMessage
  })
  @IsIn([
    TodoStatusEnum.waiting,
    TodoStatusEnum.actif,
    TodoStatusEnum.done,
  ])
  status: TodoStatusEnum;
}