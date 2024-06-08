import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCancionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(40, { message: 'El campo nombre no debe ser mayor a 40 caracteres' })
  @MinLength(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo duracion no debe ser vacío' })
  @IsString({ message: 'El campo duracion debe ser de tipo cadena' })
  @MaxLength(8, { message: 'El campo duracion no debe ser mayor a 8 caracteres' })
  @MinLength(8, { message: 'El campo duracion no debe ser menor a 8 caracteres' })
  readonly duracion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tags no debe ser vacío' })
  @IsString({ message: 'El campo tags debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo tags no debe ser mayor a 30 caracteres' })
  @MinLength(2, { message: 'El campo tags no debe ser menor a 2 caracteres' })
  readonly tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo url no debe ser vacío' })
  @IsString({ message: 'El campo url debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo url no debe ser mayor a 30 caracteres' })
  @MinLength(2, { message: 'El campo url no debe ser menor a 2 caracteres' })
  readonly url: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo idAlbum debe estar definido' })
  @IsNumber({}, { message: 'El campo idAlbum debe ser de tipo numérico' })
  readonly idAlbum: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idGenero debe estar definido' })
  @IsNumber({}, { message: 'El campo idGenero debe ser de tipo numérico' })
  readonly idGenero: number;
}
