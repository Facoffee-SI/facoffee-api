import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { IsMultiWord } from './multi-word-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome completo é obrigatório.' })
  @Validate(IsMultiWord)
  name: string;

  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @IsEmail({}, { message: 'Email é inválido.' })
  email: string;

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

  @IsNotEmpty({ message: 'IDs dos Cargos é obrigatório.' })
  @IsArray({ message: 'IDs dos Cargos deve ser um Array.' })
  @ArrayMinSize(1, { message: 'Deve ser enviado pelo menos um Cargo.' })
  roleIds: [string];
}
