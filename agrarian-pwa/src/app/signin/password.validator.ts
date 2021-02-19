import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {

    static areEqual(formGroup: FormGroup) {
      let value;
      let valid = true;
      const formGroupControls: string[] = ['newPassword', 'confirmPassword'];
      for (const key in formGroupControls) {
        if (formGroup.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>formGroup.controls[key];

          if (value === undefined) {
            value = control.value;
          } else {
            if (value !== control.value) {
              valid = false;
              break;
            }
          }
        }
      }

      if (valid) {
        return null;
      }

      return {
        areEqual: true
      };
    }


    static areNotEqual(formGroup: FormGroup) {
      let value;
      let valid = true;
      const formGroupControls: string[] = ['oldPassword', 'newPassword'];
      for (const key in formGroupControls) {
        if (formGroup.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>formGroup.controls[key];

          if (value !== undefined) {
            valid = false;
            break;
          } else {
            if (value !== control.value) {
              value = control.value;
            }
          }
        }
      }
  
      if (valid) {
        return null;
      }
  
      return {
        areNotEqual: true
      };
    }
  }
