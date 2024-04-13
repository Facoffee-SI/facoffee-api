import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { IsMultiWord } from './multi-word-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Validate(IsMultiWord)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
