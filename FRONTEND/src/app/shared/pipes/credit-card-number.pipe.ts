import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardNumber',
  standalone: true
})
export class CreditCardNumberPipe implements PipeTransform {

  transform(value: string): unknown {
    if (!value) {
      return '';
    }
    return value.replace(/(\d*)(\d{4})/, '************$2');
  }
}
