import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Tema } from '../entities/tema.entity';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>,
  ) {}

  //buscar tudo
  async findAll(): Promise<Tema[]> {
    return await this.temaRepository.find({
      relations: {
        postagem: true,
      },
    });
  }

  //nuscar por id
  async findById(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({
      where: {
        id,
      },
      relations: {
        postagem: true,
      },
    });

    if (!tema)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return tema;
  }

  //buscar por descriçao
  async findAllByDescricao(descricao: string): Promise<Tema[]> {
    return await this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        postagem: true,
      },
    });
  }

  //criar tema
  async create(Tema: Tema): Promise<Tema> {
    return await this.temaRepository.save(Tema);
  }

  //atualizar tema
  async update(tema: Tema): Promise<Tema> {
    await this.findById(tema.id);

    return await this.temaRepository.save(tema);
  }

  //deletar tema
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.temaRepository.delete(id);
  }
}
