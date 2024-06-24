import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Total é obrigatório.' })
  total: number;

  @IsNotEmpty({ message: 'Situação é obrigatória.' })
  situation: string;
}
