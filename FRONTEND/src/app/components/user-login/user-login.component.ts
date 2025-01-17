import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  providers: [ApiService],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  public login: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  public attemptLogin(): void {
    this.errorMessage = '';

    this.apiService.loginUser(this.login, this.password).pipe(take(1)).subscribe(
      (res) => {
        localStorage.setItem('name', res.nom);
        localStorage.setItem('surname', res.prenom);
        localStorage.setItem('login', res.login);
        this.router.navigate(['/objekts']);
      },
      (err) => {
        this.errorMessage = err.error.message;
        console.error(err);
      }
    );
  }
}
