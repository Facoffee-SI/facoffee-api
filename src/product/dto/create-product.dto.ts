import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome do produto é obrigatório.' })
  @IsString({ message: 'Nome do produto deve ser uma string.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Marca é obrigatória.' })
  brand: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Preço é obrigatório.' })
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Código de barras é obrigatório.' })
  barCode: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Descrição do produto é obrigatória.' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Quantidade é obrigatória.' })
  quantity: number;

  @ApiProperty()
  @IsOptional()
  discountValue?: number;

  @ApiProperty()
  @IsOptional()
  isDiscountPercentage?: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: 'ID da categoria é obrigatório.' })
  categoryId: string;
}
