import { Component, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';
import { MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,
    MatTableModule
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'] // Cambié 'styleUrl' a 'styleUrls'
})
export class ClientesComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.userService.getClients().subscribe((data: any) => {
      this.users = data;
    }, error => {
      console.error('Error fetching clients', error);
    });
  }

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

  onMenu() {
    this.router.navigate(['home']);
  }

  onRegistrar() {
    this.router.navigate(['registro']);
  }

  onEliminar(user: any) {
    this.userService.deleteClient(user.id).subscribe(() => {
      this.getData(); // Refrescar la lista de usuarios después de eliminar
    }, error => {
      console.error('Error deleting client', error);
    });
  }

  onModificar(user: any) {
    this.router.navigate(['modificar', user.id]);
  }

  onContrato(user: any) {
    // Lógica para manejar la acción de contrato
    this.router.navigate(['contrato', user.id]);
  }
}
