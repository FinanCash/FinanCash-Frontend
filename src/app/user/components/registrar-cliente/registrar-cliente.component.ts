import {Component} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormField} from "@angular/material/form-field";
import {UserService} from "../../../services/user.service";
import {MatCard} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [
    MatTableModule,
    MatSidenavContent,
    MatIcon,
    MatListItem,
    MatList,
    MatToolbar,
    MatSidenav,
    MatSidenavContainer,
    MatFormField,
    MatCard,
    FormsModule
  ],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})

export class RegistrarClienteComponent{
  constructor(private userService: UserService, private router: Router) {} // Inyecta el servicio correcto
  onLogin() {
    this.router.navigate(['login']);
  }
  onUsuarios() {
    this.router.navigate(['clientes']);
  }
  onDeudas() {
    this.router.navigate(['deudas']);
  }
  onCredito() {
    this.router.navigate(['credito']);
  }

  onRegistrar(){
    this.router.navigate(['contrato']);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const userData = form.value;
      this.userService.saveUser(userData).subscribe(
        (response: any) => {
          console.log('User saved successfully:', response);
          // Agregar código aquí para manejar la respuesta del servidor, como mostrar un mensaje de éxito al usuario
        },
        (error: any) => {
          console.error('Error saving user:', error);
          // Agregar código aquí para manejar errores, como mostrar un mensaje de error al usuario
        }
      );
    }
  }

  goBack(): void {
    //FALTA Método para volver atrás al hacer clic en "REGRESAR"
  }
}
