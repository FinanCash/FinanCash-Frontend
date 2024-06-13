import { Routes } from '@angular/router';
import { LoginComponent } from './public/components/login/login.component';
import { RegisterComponent } from './public/components/register/register.component';
import { MenuComponent } from './user/components/menu/menu.component';
import { DEFAULT_DIALOG_CONFIG } from '@angular/cdk/dialog';
import { DeudasComponent } from './user/components/deudas/deudas.component';
import { CronogramaComponent } from './user/components/cronograma/cronograma.component';
import { ClientesComponent } from './user/components/clientes/clientes.component';
import { CreditoComponent } from './user/components/Credito/credito.component';
import { RegistrarClienteComponent } from './user/components/registrar-cliente/registrar-cliente.component';
import { RegistrarClientesSiguienteComponent } from './user/components/registrar-clientes-siguiente/registrar-clientes-siguiente.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: MenuComponent },
  { path: 'deudas', component: DeudasComponent },
  { path: 'cronograma', component: CronogramaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'credito', component: CreditoComponent },
  { path: 'registro', component: RegistrarClienteComponent },
  { path: 'contrato', component: RegistrarClientesSiguienteComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }, // Redirige al login cuando la URL sea vacía

];
