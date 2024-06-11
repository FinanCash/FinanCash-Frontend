import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "../../../services/user.service";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardFooter,
    MatIcon,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  clientes: number = 0;
  saldoTotal: number = 0;
  clientesActivos: number = 0;

  constructor(private userService: UserService) {} // Inyecta el servicio correcto

  ngOnInit() {
    // Cambia los endpoints según sea necesario
    this.userService.getData('https://api.example.com/clientes').subscribe(data => {
      this.clientes = data.count;
    });
    this.userService.getData('https://api.example.com/saldo-total').subscribe(data => {
      this.saldoTotal = data.total;
    });
    this.userService.getData('https://api.example.com/clientes-activos').subscribe(data => {
      this.clientesActivos = data.count;
    });
  }
}
