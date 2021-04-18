import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { TodoService } from 'src/todoService/todoService.service';

import { TodoController } from './todo.controller';
import { todoEntity } from './entities/todo.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
  imports: [SharedModule,
  TypeOrmModule.forFeature([todoEntity])]
})
export class TodoModule {}
