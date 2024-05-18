import { IsNotEmpty } from 'class-validator';
import { ActionEnum } from '../entities/permission.entity';
export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Ação é obrigatória.' })
  action: ActionEnum;

  @IsNotEmpty({ message: 'Nome da tabela é obrigatório.' })
  tableName: string;
}
