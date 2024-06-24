import { IsNotEmpty } from 'class-validator';
import { ActionEnum } from '../entities/permission.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePermissionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Ação é obrigatória.' })
  action: ActionEnum;

  @ApiProperty()
  @IsNotEmpty({ message: 'Nome da tabela é obrigatório.' })
  tableName: string;
}
