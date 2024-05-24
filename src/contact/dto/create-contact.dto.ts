import { IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty({ message: 'Nome da empresa é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório.' })
  address: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório.' })
  phone: string;

  @IsNotEmpty({ message: 'Descrição é obrigatório.' })
  description: string;

  @IsNotEmpty({ message: 'Email é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'Link Google Maps é obrigatório.' })
  linkGoogleMaps: string;
}
