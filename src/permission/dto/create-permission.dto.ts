import { IsNotEmpty } from 'class-validator';
import { ActionEnum } from '../entities/permission.entity';
export class CreatePermissionDto {
  @IsNotEmpty()
  action: ActionEnum;

  @IsNotEmpty()
  tableName: string;
}
