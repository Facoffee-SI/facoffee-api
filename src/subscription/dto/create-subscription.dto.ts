import { IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty({ message: 'ID do Plano é obrigatório.' })
  planId: string;
}
