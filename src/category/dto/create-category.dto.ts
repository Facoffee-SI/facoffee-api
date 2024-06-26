import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome da categoria é obrigatório.' })
  name: string;
}
