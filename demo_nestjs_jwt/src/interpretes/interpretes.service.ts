import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterpreteDto } from './dto/create-interprete.dto';
import { UpdateInterpreteDto } from './dto/update-interprete.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interprete } from './entities/interprete.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterpretesService {
  constructor(
    @InjectRepository(Interprete) private interpretesRepository: Repository<Interprete>,
  ) {}

  async create(createInterpreteDto: CreateInterpreteDto): Promise<Interprete> {
    const existe = await this.interpretesRepository.findOneBy({
      nombre: createInterpreteDto.nombre.trim(),
      nacionalidad: createInterpreteDto.nacionalidad.trim(),
    });

    if (existe) {
      throw new ConflictException('El intérprete ya existe');
    }

    return this.interpretesRepository.save({
      nombre: createInterpreteDto.nombre.trim(),
      nacionalidad: createInterpreteDto.nacionalidad.trim(),
    });
  }

  async findAll(): Promise<Interprete[]> {
    return this.interpretesRepository.find();
  }

  async findAllByGenero(idGenero: number): Promise<Interprete[]> {
    return this.interpretesRepository
      .createQueryBuilder('interpretes')
      .innerJoin('interpretes.albumes', 'albumes')
      .innerJoin('albumes.canciones', 'canciones')
      .innerJoin('canciones.genero', 'genero')
      .where('genero.id = :idGenero', { idGenero })
      .getMany();
  }

  async findOne(id: number): Promise<Interprete> {
    const interprete = await this.interpretesRepository.findOneBy({ id });
    if (!interprete) {
      throw new NotFoundException(`El intérprete ${id} no existe`);
    }
    return interprete;
  }

  async update(id: number, updateInterpreteDto: UpdateInterpreteDto): Promise<Interprete> {
    const interprete = await this.findOne(id);
    const interpreteUpdate = Object.assign(interprete, updateInterpreteDto);
    return this.interpretesRepository.save(interpreteUpdate);
  }

  async remove(id: number) {
    const interprete = await this.findOne(id);
    return this.interpretesRepository.delete(interprete.id);
  }
}
