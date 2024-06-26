import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome da empresa é obrigatório.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Endereço é obrigatório.' })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Telefone é obrigatório.' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Descrição é obrigatório.' })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Link Google Maps é obrigatório.' })
  linkGoogleMaps: string;
}
