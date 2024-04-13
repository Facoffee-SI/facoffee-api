import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMultiWord', async: false })
export class IsMultiWord implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.trim().split(/\s+/).length > 1;
  }

  defaultMessage() {
    return 'too short name';
  }
}
