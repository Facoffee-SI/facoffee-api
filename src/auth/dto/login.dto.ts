import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  password: string;
}
