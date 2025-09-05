import { FormGroup, ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export interface IFormGroupConfig {
  formName: string;
  form: FormGroup;
  updateOn?: string;
  validators: ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
}