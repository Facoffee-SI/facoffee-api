import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateAboutDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Descrição é obrigatório.' })
  description: string;
}
