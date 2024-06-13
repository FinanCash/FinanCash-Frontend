import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-credito',
  standalone: true,
  imports: [
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
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.css'
})
export class CreditoComponent {

  constructor(private router: Router) {}
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
  onCronograma() {
    this.router.navigate(['cronograma']);
  }

}
