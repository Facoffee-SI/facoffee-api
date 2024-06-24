import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { IsMultiWord } from '../../user/dto/multi-word-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome completo é obrigatório.' })
  @Validate(IsMultiWord)
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @IsEmail({}, { message: 'Email é inválido.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'CPF é obrigatório.' })
  cpf: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Telefone é obrigatório.' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Endereço é obrigatório.' })
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'Senha não é forte o suficiente.' },
  )
  password: string;
}
