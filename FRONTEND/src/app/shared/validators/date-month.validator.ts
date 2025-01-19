import { AbstractControl } from '@angular/forms';
import moment from 'moment';

export class DateMonthValidator {
  static dateMonthValidator(control: AbstractControl) {
    if (control && control.value && !moment(control.value, 'MM/YYYY', true).isValid()) {
      return { dateValidator: true };
    }
    return null;
  }
}
