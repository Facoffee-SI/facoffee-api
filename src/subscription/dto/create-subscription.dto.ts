import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'ID do Plano é obrigatório.' })
  planId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Informe se o Plano é anual.' })
  yearly: boolean;
}
