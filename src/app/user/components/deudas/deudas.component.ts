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
  dataSource: MatTableDataSource<any>;

  constructor(private userService: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.userService.getAllDebt().subscribe(
      (data: any) => {
        this.dataSource.data = data; // Asigna los datos recibidos al origen de datos de la tabla
      },
      (error) => {
        console.error('Error fetching debt data:', error);
      }
    );
  }

  pagar(userId: number): void {
    console.log('Usuario ID:', userId, 'ha pagado.');
    this.userService.updateMonthlyScheduleStatus(userId);
  }

  onLogin(): void {
    this.router.navigate(['login']);
  }

  onUsuarios(): void {
    this.router.navigate(['clientes']);
  }

  onDeudas(): void {
    this.router.navigate(['deudas']);
  }

  onCredito(): void {
    this.router.navigate(['credito']);
  }

  onMenu(): void {
    this.router.navigate(['home']);
  }
}