import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../shared/services/api/api.service';
import { RouterLink } from '@angular/router';
import { HttpResponseMessage } from '../../shared/models/HttpResponseMessage';

@Component({
  selector: 'user-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  new_user_form: FormGroup;
  public errorMessage: string = '';
  public successMessage: string = '';

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.new_user_form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-éèêàâçîïôûùäëïöü]+$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-éèêàâçîïôûùäëïöü]+$')]],
      login: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      password_confirm: ['', [Validators.required, , Validators.minLength(5), Validators.maxLength(15)]],
    });
  }

  public get first_name() {
    return this.new_user_form.get('first_name');
  }

  public get last_name() {
    return this.new_user_form.get('last_name');
  }

  public get login() {
    return this.new_user_form.get('login');
  }

  public get password() {
    return this.new_user_form.get('password');
  }

  public get password_confirm() {
    return this.new_user_form.get('password_confirm');
  }

  public submitUserForm() {
    this.errorMessage = '';
    this.apiService.registerUser(this.first_name?.value, this.last_name?.value, this.login?.value, this.password?.value, this.password_confirm?.value).subscribe((response: HttpResponseMessage) => {
      this.successMessage = response.message;
    },
    (err) => {
      this.errorMessage = err.error.message;
      console.error(err);
    });
  }
}
