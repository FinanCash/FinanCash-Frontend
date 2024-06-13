import {Component} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {UserService} from "../../../services/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registrar-clientes-siguiente',
  standalone: true,
  imports: [
    MatCard,
    MatCell,
    MatIconModule,
    MatToolbarModule,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatList,
    MatListItem,
    MatRow,
    MatRowDef,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatTable,
    MatToolbar,
    FormsModule,
    MatFormField,
    ReactiveFormsModule
  ],
  templateUrl: './registrar-clientes-siguiente.component.html',
  styleUrl: './registrar-clientes-siguiente.component.css'
})
export class RegistrarClientesSiguienteComponent{
  constructor(private userService: UserService, private router: Router) {} // Inyecta el servicio correcto
  onLogin() {
    this.router.navigate(['home']);
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

  onSubmit(form: any): void {
    if (form.valid) {
      const clientData = form.value;
      this.userService.registerClient(clientData).subscribe(
        (response: any) => {
          console.log('Client registered successfully:', response);
          // Agregar código aquí para manejar la respuesta del backend, como mostrar un mensaje de éxito
        },
        (error: any) => {
          console.error('Error registering client:', error);
          // Agregar código aquí para manejar errores, como mostrar un mensaje de error al usuario
        }
      );
    }
  }

  goBack(): void {
    // FALTA Método para volver atrás al hacer clic en "REGRESAR"
  }
}
