import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';

// conexao com o banco de dados atraves de TypeORM
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql' ,
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem],
      synchronize: true,
      logging: true, //opcional
   }), 

   PostagemModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
