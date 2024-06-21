import { Component, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatList, MatListItem } from "@angular/material/list";
import { MatToolbar } from "@angular/material/toolbar";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { UserService } from "../../../services/user.service";
import { MatCard } from "@angular/material/card";
import { MatTableModule } from '@angular/material/table';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRequest } from '../../../models/client-request';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  cliente: ClientRequest = new ClientRequest();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      creditLimit: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      birthDate: ['', [Validators.required]]
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

  onSubmit(form: any): void {
    if (form.valid) {
      const clientData = form.value;
      clientData.birthDate = this.formatDate(clientData.birthDate);
      this.userService.addClient(clientData).subscribe(
        (response: any) => {
          console.log('User saved successfully:', response);
          this.onRegistrar();
        },
        (error: any) => {
          console.error('Error saving user:', error);
        }
      );
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cliente.firstName = this.form.value.firstName;
      this.cliente.lastName = this.form.value.lastName;
      this.cliente.dni = this.form.value.dni;
      this.cliente.creditLimit = this.form.value.creditLimit;
      this.cliente.address = this.form.value.address;
      this.cliente.phone = this.form.value.phone;
      this.cliente.birthDate = this.formatDate(this.form.value.birthDate);
      this.cliente.userId = 1;

      this.userService.addClient(this.cliente).subscribe(
        (response: any) => {
          console.log('Cliente registrado con éxito:', response);
          this.router.navigate(['clientes']);
        },
        (error: any) => {
          console.error('Error al registrar el cliente:', error);
          this.mensaje = 'Error al registrar el cliente. Inténtelo de nuevo.';
        }
      );
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  onRegistrar() {
    this.router.navigate(['clientes']);
  }

  goBack(): void {
    this.router.navigate(['previous-page']);
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
