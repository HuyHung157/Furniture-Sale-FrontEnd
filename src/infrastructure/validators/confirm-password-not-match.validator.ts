import { AbstractControl, ValidatorFn } from '@angular/forms';

export function confirmPasswordNotMatch(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const controlParent: any = control?.parent?.controls;
    if (controlParent) {
      const password = controlParent.password?.value;
      const confirmPassword = controlParent.confirmPassword?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        return { confirmPasswordNotMatch: { confirmPassword } };
      }
    }
    return null;
  };
}
