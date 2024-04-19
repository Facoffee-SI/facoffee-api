import { IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Nome da categoria é obrigatório.' })
  name: string;
}
