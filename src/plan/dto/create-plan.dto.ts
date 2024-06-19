import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty({ message: 'Nome do plano é obrigatório.' })
  @IsString({ message: 'Nome do plano deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'Preço Mensal é obrigatório.' })
  priceMonth: number;

  @IsNotEmpty({ message: 'Preço Anual é obrigatório.' })
  priceYear: number;

  @IsNotEmpty({ message: 'Descrição do plano é obrigatória.' })
  description: string;

  @IsNotEmpty({ message: 'IDs dos produtos são obrigatórios' })
  @IsArray()
  productIds: string[];

  @IsOptional()
  active: boolean;
}
