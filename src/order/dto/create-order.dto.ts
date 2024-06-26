import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Total é obrigatório.' })
  total: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Situação é obrigatória.' })
  situation: string;
}
