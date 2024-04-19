import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty({ message: 'Nome do cargo é obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'IDs das permissões é obrigatório.' })
  @IsArray({
    message: 'IDs das Permissões deve ser um Array.',
  })
  @ArrayMinSize(1, { message: 'Deve ser enviado pelo menos uma Permissão.' })
  permissionIds: [number];
}
