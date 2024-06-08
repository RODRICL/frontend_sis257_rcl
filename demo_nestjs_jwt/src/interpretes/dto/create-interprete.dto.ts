import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateInterpreteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El campo nombre no debe ser mayor a 100 caracteres' })
  @MinLength(2, { message: 'El campo nombre no debe ser menor a 2 caracteres' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nacionalidad no debe ser vacío' })
  @IsString({ message: 'El campo nacionalidad debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El campo nacionalidad no debe ser mayor a 50 caracteres' })
  @MinLength(5, { message: 'El campo nacionalidad no debe ser menor a 5 caracteres' })
  readonly nacionalidad: string;
}
