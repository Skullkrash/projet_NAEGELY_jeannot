import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ObjektsDisplayComponent } from './components/objekts-display/objekts-display.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'objekts', component: ObjektsDisplayComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: '**', redirectTo: 'home' }
];
