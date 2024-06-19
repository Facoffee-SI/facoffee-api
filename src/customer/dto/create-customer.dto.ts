import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { IsMultiWord } from '../../user/dto/multi-word-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Nome completo é obrigatório.' })
  @Validate(IsMultiWord)
  name: string;

  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @IsEmail({}, { message: 'Email é inválido.' })
  email: string;

  @IsNotEmpty({ message: 'CPF é obrigatório.' })
  cpf: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório.' })
  phone: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório.' })
  address: string;

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
