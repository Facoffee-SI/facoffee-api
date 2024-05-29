import { IsNotEmpty } from 'class-validator';
export class CreateAboutUsDto {
  @IsNotEmpty({ message: 'Descrição é obrigatório.' })
  description: string;
}
