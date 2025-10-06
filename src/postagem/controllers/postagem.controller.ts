import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard) // Aplica o Guard JWT a todo o Controller, exigindo um token válido para acesso
@Controller('/postagens') // Define o endpoint base da API: /postagens
@ApiBearerAuth()
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  // Rota GET /postagens: Busca todos as Postagens
  @Get()
  @HttpCode(HttpStatus.OK) // 200 OK
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }

  // Rota GET /postagens/:id: Busca uma Postagem pelo ID
  @Get('/:id')
  @HttpCode(HttpStatus.OK) // 200 OK
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    // ParseIntPipe garante que o ID é um número
    return this.postagemService.findById(id);
  }

  // Rota GET /postagens/titulo/:titulo: Busca Postagens por Título (busca parcial)
  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK) // 200 OK
  findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findAllByTitulo(titulo);
  }

  // Rota POST /postagens: Cria uma nova Postagem
  @Post()
  @HttpCode(HttpStatus.CREATED) // 201 Created
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  // Rota PUT /postagens: Atualiza uma Postagem existente (requer o ID no Body)
  @Put()
  @HttpCode(HttpStatus.OK) // 200 OK
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  // Rota DELETE /postagens/:id: Deleta uma Postagem por ID
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postagemService.delete(id);
  }
}
