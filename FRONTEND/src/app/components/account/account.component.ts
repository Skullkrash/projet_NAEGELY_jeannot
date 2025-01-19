import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../shared/services/api/api.service';
import { Router } from '@angular/router';
import { HttpResponseMessage } from '../../shared/models/HttpResponseMessage';
import { CreditCardsService } from '../../shared/services/credit-cards/credit-cards.service';
import { DateMonthValidator } from '../../shared/validators/date-month.validator';
import { CreditCard } from '../../shared/models/CreditCard';
import { CreditCardsDisplayComponent } from '../credit-cards-display/credit-cards-display.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CreditCardsDisplayComponent, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  public name: string = '';
  public surname: string = '';
  public login: string = '';
  public update_login_form: FormGroup;
  public update_password_form: FormGroup;
  public credit_card_form: FormGroup;
  public errorMessageLogin: string = '';
  public successMessageLogin: string = '';
  public errorMessagePassword: string = '';
  public successMessagePassword: string = '';
  public displayCreditCardsForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private creditCardsService: CreditCardsService, private router: Router) {
    if (!localStorage.getItem('login')) {
      this.router.navigate(['/home']);
    }
    this.update_login_form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      login_confirm: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    });
    this.update_password_form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      password_confirm: ['', [Validators.required, , Validators.minLength(5), Validators.maxLength(15)]],
    });
    this.credit_card_form = this.formBuilder.group({
      number: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(16), Validators.maxLength(16)]),
      owner: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z \-éèêàâçîïôûùäëïöü]+$')]),
      expiryDate: new FormControl('', [Validators.required, DateMonthValidator.dateMonthValidator]),
      ccv: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(3), Validators.maxLength(3)]),
    });
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.surname = localStorage.getItem('surname') || '';
    this.login = localStorage.getItem('login') || '';
  }

  public submitNewLogin(): void {
    this.resetMessages();
    let newUserLogin = this.login_form?.value;

    this.apiService.updateUserLogin(this.login, this.login_form?.value, this.login_confirm?.value).subscribe((response: HttpResponseMessage) => {
      this.successMessageLogin = response.message;
      localStorage.setItem('login', newUserLogin);
      this.login = newUserLogin;
    },
    (err) => {
      this.errorMessageLogin = err.error.message;
      console.error(err);
    });
  }

  public submitNewPassword(): void {
    this.resetMessages();

    this.apiService.updateUserPassword(this.login, this.password?.value, this.password_confirm?.value).subscribe((response: HttpResponseMessage) => {
      this.successMessagePassword = response.message;
    },
    (err) => {
      this.errorMessagePassword = err.error.message;
      console.error(err);
    });
  }

  public submitCreditCard() {
    let newCard: CreditCard = { number: this.number?.value, owner: this.owner?.value, expiryDate: this.expiryDate?.value, ccv: this.ccv?.value};
    this.creditCardsService.addCard(newCard);
    this.credit_card_form.reset();
  }

  public displayCreditCardForm(): void {
    this.displayCreditCardsForm = !this.displayCreditCardsForm;
  }

  private resetMessages(): void {
    this.errorMessageLogin = '';
    this.errorMessagePassword = '';
    this.successMessageLogin = '';
    this.successMessagePassword = '';
  }

  public get login_form() {
    return this.update_login_form.get('login');
  }

  public get login_confirm() {
    return this.update_login_form.get('login_confirm');
  }

  public get password() {
    return this.update_password_form.get('password');
  }

  public get password_confirm() {
    return this.update_password_form.get('password_confirm');
  }

  public get number() {
    return this.credit_card_form.get('number');
  }

  public get owner() {
    return this.credit_card_form.get('owner');
  }

  public get expiryDate() {
    return this.credit_card_form.get('expiryDate');
  }

  public get ccv() {
    return this.credit_card_form.get('ccv');
  }
}
