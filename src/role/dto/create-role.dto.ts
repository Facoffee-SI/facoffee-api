import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome do cargo é obrigatório.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'IDs das permissões é obrigatório.' })
  @IsArray({
    message: 'IDs das Permissões deve ser um Array.',
  })
  @ArrayMinSize(1, { message: 'Deve ser enviado pelo menos uma Permissão.' })
  permissionIds: [number];
}
