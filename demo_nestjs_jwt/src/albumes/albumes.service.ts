import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Interprete } from 'src/interpretes/entities/interprete.entity';

@Injectable()
export class AlbumesService {
  constructor(@InjectRepository(Album) private albumsRepository: Repository<Album>) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const existe = await this.albumsRepository.findOneBy({
      nombre: createAlbumDto.nombre.trim(),
      interprete: { id: createAlbumDto.idInterprete },
    });

    if (existe) {
      throw new ConflictException('El álbum ya existe');
    }

    return this.albumsRepository.save({
      nombre: createAlbumDto.nombre.trim(),
      fechaLanzamiento: createAlbumDto.fechaLanzamiento,
      interprete: { id: createAlbumDto.idInterprete },
    });
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find({ relations: ['interprete'] });
  }

  async findAllByInterprete(idInterprete): Promise<Album[]> {
    return this.albumsRepository.findBy({ interprete: { id: idInterprete } });
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumsRepository.findOne({
      where: { id },
      relations: ['interprete'],
    });
    if (!album) {
      throw new NotFoundException(`El álbum ${id} no existe`);
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    const albumUpdate = Object.assign(album, updateAlbumDto);
    albumUpdate.interprete = { id: updateAlbumDto.idInterprete } as Interprete;
    return this.albumsRepository.save(albumUpdate);
  }

  async remove(id: number) {
    const album = await this.findOne(id);
    return this.albumsRepository.delete(album.id);
  }
}
