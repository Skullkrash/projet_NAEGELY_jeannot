import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objekt } from '../../models/Objekt';
import { environment } from '../../environments/environments';
import { User } from '../../models/User';
import { HttpResponseMessage } from '../../models/HttpResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public loginUser(login: string, password: string): Observable<User> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<User>(
      environment.backendLoginClient,
      data,
      httpOptions
    );
  }

  public registerUser(name: string, surname: string, login: string, password: string, passwordConfirmation: string): Observable<HttpResponseMessage> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    let data: string = 'nom=' + surname + '&prenom=' + name + '&login=' + login + '&password=' + password + '&passwordConfirmation=' + passwordConfirmation;
    return this.http.post<HttpResponseMessage>(
      environment.backendRegisterClient,
      data,
      httpOptions
    );
  }

  public updateUserLogin(login: string, newLogin: string, newLoginConfirmation: string): Observable<HttpResponseMessage> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    // login, newLogin, newLoginConfirmation
    let data: string = 'login=' + login + '&newLogin=' + newLogin + '&newLoginConfirmation=' + newLoginConfirmation;
    return this.http.post<HttpResponseMessage>(
      environment.backendUpdateLogin,
      data,
      httpOptions
    );
  }

  public updateUserPassword(login: string, newPassword: string, newPasswordConfirmation: string): Observable<HttpResponseMessage> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    let data: string = 'login=' + login + '&newPassword=' + newPassword + '&newPasswordConfirmation=' + newPasswordConfirmation;
    return this.http.post<HttpResponseMessage>(
      environment.backendUpdatePassword,
      data,
      httpOptions
    );
  }

  public getCatalogue(): Observable<Objekt[]> {
    return this.http.get<Objekt[]>(environment.backendCatalogue);
  }
}
