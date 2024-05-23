import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Nome do produto é obrigatório.' })
  @IsString({ message: 'Nome do produto deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'Marca é obrigatória.' })
  brand: string;

  @IsNotEmpty({ message: 'Preço é obrigatório.' })
  price: number;

  @IsNotEmpty({ message: 'Código de barras é obrigatório.' })
  barCode: string;

  @IsNotEmpty({ message: 'Descrição do produto é obrigatória.' })
  description: string;

  @IsNotEmpty({ message: 'Quantidade é obrigatória.' })
  quantity: number;

  @IsOptional()
  discountValue?: number;

  @IsOptional()
  isDiscountPercentage?: boolean;

  @IsNotEmpty({ message: 'ID da categoria é obrigatório.' })
  categoryId: string;
}
