import { todoEntity } from './todo/entities/todo.entity';
import { Test2Module } from './test2/test2.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test.module';
import { TodoModule } from './todo/todo.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TestModule, Test2Module, TodoModule, SharedModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestsi2',
    entities: ["dist/**/*.entity.{js,ts}"],
    synchronize: true,
    logging: true
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
  
  
  


}
