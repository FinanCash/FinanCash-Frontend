import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user.service";
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
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
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService,private router: Router) {}
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
  onRegistrar(){
    this.router.navigate(['registro']);
  }


  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const endpoint = `${environment.baseUrl}/clientes`; // Utiliza la URL del environment
    this.userService.getData(endpoint).subscribe((data: any) => {
      this.users = data;
    });
  }
}
