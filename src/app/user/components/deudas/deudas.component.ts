import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-deudas',
  standalone: true,
  imports: [
    MatIcon,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './deudas.component.html',
  styleUrl: './deudas.component.css'
})
export class DeudasComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

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
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const endpoint = `${environment.baseUrl}/clientes`;
    this.userService.getData(endpoint).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<any>(data.users); // Suponiendo que la respuesta de la API tiene una propiedad 'users'
    });
  }

  pagar(userId: number): void {
    console.log('Usuario ID:', userId, 'ha pagado.');
  }
}
