import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El campo descripcion no debe ser mayor a 50 caracteres' })
  @MinLength(4, { message: 'El campo descripcion no debe ser menor a 4 caracteres' })
  readonly descripcion: string;
}
