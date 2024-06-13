import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Link {
  href: string;
  icon: string;
  text: string;
}

interface Row {
  cuota: number;
  amortizacion: string;
  interes: string;
  monto: string;
  fechaVencimiento: string;
}
@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.css'
})
export class CronogramaComponent implements OnInit {
  public links: Link[] = [
    { href: '#', icon: 'home', text: 'MENÚ PRINCIPAL' },
    { href: '#', icon: 'group', text: 'USUARIOS' },
    { href: '#', icon: 'credit_card', text: 'CRÉDITOS' },
    { href: '#', icon: 'handshake', text: 'DEUDAS' },
    { href: '#', icon: 'inventory', text: 'PRODUCTOS' },
    { href: '#', icon: 'logout', text: 'CERRAR SESIÓN' }
  ];

  public rows: Row[] = [];
  public displayedColumns: string[] = ['cuota', 'amortizacion', 'interes', 'monto', 'fechaVencimiento'];

  constructor(private userService: UserService,private router: Router) {}

  onCredito() {
    this.router.navigate(['credito']);
  }
  onMenu() {
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
    this.userService.getData('/api/data').subscribe((data: Row[]) => {
      this.rows = data;
    });
  }
}
