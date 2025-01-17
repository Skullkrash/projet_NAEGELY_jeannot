import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../shared/services/api/api.service';
import { Router } from '@angular/router';
import { HttpResponseMessage } from '../../shared/models/HttpResponseMessage';

@Component({
  selector: 'account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  public name: string = '';
  public surname: string = '';
  public login: string = '';
  public update_login_form: FormGroup;
  public update_password_form: FormGroup;
  public errorMessageLogin: string = '';
  public successMessageLogin: string = '';
  public errorMessagePassword: string = '';
  public successMessagePassword: string = '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
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
  }

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
    this.surname = localStorage.getItem('surname') || '';
    this.login = localStorage.getItem('login') || '';
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

  private resetMessages(): void {
    this.errorMessageLogin = '';
    this.errorMessagePassword = '';
    this.successMessageLogin = '';
    this.successMessagePassword = '';
  }

}
