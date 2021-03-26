import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { TodoService } from 'src/todoService/todoService.service';

import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
  imports: [SharedModule]
})
export class TodoModule {}
