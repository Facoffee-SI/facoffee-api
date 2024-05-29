import { IsNotEmpty } from 'class-validator';
export class CreateAboutDto {
  @IsNotEmpty({ message: ' é obrigatório.' })
  description: string;
}
