import { Routes } from '@angular/router';
import { MenuComponent } from "./user/components/menu/menu.component";
import { LoginComponent } from "./public/components/login/login.component";
import { RegisterComponent } from "./public/components/register/register.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: MenuComponent},
  {path: '', pathMatch: 'full', component: MenuComponent},
  {path: '*', pathMatch: 'full', redirectTo: 'home'},
];
