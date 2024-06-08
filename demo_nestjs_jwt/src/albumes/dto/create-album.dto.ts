import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' })
  @MinLength(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' })
  readonly nombre: string;

  @ApiProperty({ example: '2024-04-13' })
  @IsNotEmpty({ message: 'El campo fechaLanzamiento no debe ser vacío' })
  @IsDateString({}, { message: 'El campo fechaLanzamiento debe ser de tipo fecha' })
  readonly fechaLanzamiento: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo idInterprete debe estar definido' })
  @IsNumber({}, { message: 'El campo idInterprete debe ser de tipo numérico' })
  readonly idInterprete: number;
}
