import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  permissionIds: [number];
}
