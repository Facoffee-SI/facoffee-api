import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome do plano é obrigatório.' })
  @IsString({ message: 'Nome do plano deve ser uma string.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Preço Mensal é obrigatório.' })
  priceMonth: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Preço Anual é obrigatório.' })
  priceYear: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Descrição do plano é obrigatória.' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'IDs dos produtos são obrigatórios' })
  @IsArray()
  productIds: string[];

  @ApiProperty()
  @IsOptional()
  active: boolean;
}
