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
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Tema } from '../entities/tema.entity';
import { TemaService } from '../services/tema.service';

// Aplica o Guard JWT a todas as rotas deste Controller, exigindo token de autenticação
@UseGuards(JwtAuthGuard)
@Controller('/temas') // Define o endpoint base da API: /temas
@ApiBearerAuth()
export class TemaController {
  constructor(private readonly temaService: TemaService) {}

  // Rota GET /temas: Busca todos os Temas
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Tema[]> {
    return this.temaService.findAll();
  }

  // Rota GET /temas/:id: Busca um Tema por ID
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
    return this.temaService.findById(id);
  }

  // Rota GET /temas/descricao/:descricao: Busca Temas por descrição (busca parcial)
  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findAllBydescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
    return this.temaService.findAllByDescricao(descricao);
  }

  // Rota POST /temas: Cria um novo Tema
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() Tema: Tema): Promise<Tema> {
    return this.temaService.create(Tema);
  }

  // Rota PUT /temas: Atualiza um Tema existente (requer o ID no Body)
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Tema: Tema): Promise<Tema> {
    return this.temaService.update(Tema);
  }

  // Rota DELETE /temas/:id: Deleta um Tema por ID
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.temaService.delete(id);
  }
}
