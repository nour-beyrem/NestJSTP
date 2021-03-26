
import { IsIn, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ErrorMessgaes } from 'src/generics/error-message.common';

import { TodoStatusEnum } from '../enums/TodoStatusEnum';

export class PatchTodoDto {
  @IsOptional()
  @MinLength(3, {
    message: ErrorMessgaes.tooShort
  })
  @MaxLength(10, {
    message: ErrorMessgaes.tooLong
  })
    name: string;
  @IsOptional()
  @MinLength(10, {
    message: ErrorMessgaes.tooShort
  })
  description: string;
  @IsOptional()
  @IsIn([
    TodoStatusEnum.waiting,
    TodoStatusEnum.actif,
    TodoStatusEnum.done,
  ])
  status: TodoStatusEnum;
}




