import { IsNotEmpty } from 'class-validator';
export class CreateAboutDto {
  @IsNotEmpty({ message: 'Descrição é obrigatório.' })
  description: string;
}
