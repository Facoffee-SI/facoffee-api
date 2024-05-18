import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  password: string;
}
