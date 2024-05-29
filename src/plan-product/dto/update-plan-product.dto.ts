import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanProductDto } from './create-plan-product.dto';

export class UpdatePlanProductDto extends PartialType(CreatePlanProductDto) {}
