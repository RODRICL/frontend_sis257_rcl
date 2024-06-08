import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { Repository } from 'typeorm';
import { Album } from 'src/albumes/entities/album.entity';
import { Genero } from 'src/generos/entities/genero.entity';

@Injectable()
export class CancionesService {
  constructor(@InjectRepository(Cancion) private cancionsRepository: Repository<Cancion>) {}

  async create(createCancionDto: CreateCancionDto): Promise<Cancion> {
    const existe = await this.cancionsRepository.findOneBy({
      nombre: createCancionDto.nombre.trim(),
      album: { id: createCancionDto.idAlbum },
    });

    if (existe) {
      throw new ConflictException('El canción ya existe');
    }

    return this.cancionsRepository.save({
      nombre: createCancionDto.nombre.trim(),
      duracion: createCancionDto.duracion.trim(),
      tags: createCancionDto.tags.trim(),
      url: createCancionDto.url.trim(),
      album: { id: createCancionDto.idAlbum },
      genero: { id: createCancionDto.idGenero },
    });
  }

  async findAll(): Promise<Cancion[]> {
    return this.cancionsRepository.find({ relations: ['album', 'genero', 'album.interprete'] });
  }

  async findOne(id: number): Promise<Cancion> {
    const cancion = await this.cancionsRepository.findOne({
      where: { id },
      relations: ['album', 'genero'],
    });
    if (!cancion) {
      throw new NotFoundException(`El canción ${id} no existe`);
    }
    return cancion;
  }

  async update(id: number, updateCancionDto: UpdateCancionDto): Promise<Cancion> {
    const cancion = await this.findOne(id);
    const cancionUpdate = Object.assign(cancion, updateCancionDto);
    cancionUpdate.album = { id: updateCancionDto.idAlbum } as Album;
    cancionUpdate.genero = { id: updateCancionDto.idGenero } as Genero;
    return this.cancionsRepository.save(cancionUpdate);
  }

  async remove(id: number) {
    const cancion = await this.findOne(id);
    return this.cancionsRepository.delete(cancion.id);
  }
}
