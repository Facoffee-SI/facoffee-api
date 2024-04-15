import { IsNotEmpty } from 'class-validator';
export class CreateRolePermissionDto {
  @IsNotEmpty()
  roleId: string;

  @IsNotEmpty()
  permissionId: string;
}
