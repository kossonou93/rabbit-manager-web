import { AbstractControl } from "@angular/forms";

export function passwordMatchValidator(password: string, confirmPassword: string) {
    return function(control: AbstractControl) {
      const passwordValue = control.get(password)?.value;
      const confirmPasswordValue = control.get(confirmPassword)?.value;

      if (passwordValue === confirmPasswordValue) {
        return null;
      } else {
        return { passwordMismatchError: true };
      }
    }
  }