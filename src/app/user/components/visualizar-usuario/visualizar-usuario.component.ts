import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
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
import { Router } from '@angular/router';



export interface Transaction {
  descripcion: string;
  fecha: string;
  monto: number;
  intereses: number;
  total: number;
}

const ELEMENT_DATA: Transaction[] = [
  {descripcion: 'DEBITO', fecha: '13/03/2024', monto: 10.00, intereses: 0.5, total: 10.5},
  {descripcion: 'DEBITO', fecha: '13/03/2024', monto: 10.00, intereses: 0.5, total: 10.5},
  {descripcion: 'DEBITO', fecha: '13/03/2024', monto: 10.00, intereses: 0.5, total: 10.5},
  {descripcion: 'DEBITO', fecha: '13/03/2024', monto: 10.00, intereses: 0.5, total: 10.5},
];

@Component({
  selector: 'app-visualizar-usuario',
  standalone: true,
  imports: [

    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.css']
})

export class VisualizarUsuarioComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'fecha', 'monto', 'intereses', 'total'];
  dataSource = ELEMENT_DATA;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['home']);
  }

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
}
