import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: EmailDirective,
    },
  ],
})
export class EmailDirective implements Validator {
  @Input() appEmail: string[] = [];

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validatorFn = this.emailValidator();
    return validatorFn(control);
  }

  emailValidator(): ValidatorFn {
    const regExp = new RegExp(`[A-Za-z0-9]@[A-Za-z].('bg'|'com')`);

    return (control) => {
      const isInvalid = control.value === '' || regExp.test(control.value);
      return isInvalid ? null : { emailValidator: true };
    };
  }
}
