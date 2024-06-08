import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GenerosService {
  constructor(@InjectRepository(Genero) private generosRepository: Repository<Genero>) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const existe = await this.generosRepository.findOneBy({
      descripcion: createGeneroDto.descripcion.trim(),
    });

    if (existe) {
      throw new ConflictException('El género ya existe');
    }

    return this.generosRepository.save({
      descripcion: createGeneroDto.descripcion.trim(),
    });
  }

  async findAll(): Promise<Genero[]> {
    return this.generosRepository.find();
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generosRepository.findOneBy({ id });
    if (!genero) {
      throw new NotFoundException(`El género ${id} no existe`);
    }
    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.findOne(id);
    const generoUpdate = Object.assign(genero, updateGeneroDto);
    return this.generosRepository.save(generoUpdate);
  }

  async remove(id: number) {
    const genero = await this.findOne(id);
    return this.generosRepository.delete(genero.id);
  }
}
