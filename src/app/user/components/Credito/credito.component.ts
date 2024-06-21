import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoanRequest } from '../../../models/loan-request';

@Component({
  selector: 'app-credito',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule
    MatIconModule,
    MatToolbarModule,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardFooter,
    MatIcon,
    MatCardModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css']
})
export class CreditoComponent implements OnInit {
  dni: string = '';
  nombre: string = '';
  loan: LoanRequest = new LoanRequest();
  apellidos: string = '';
  mensaje: string = '';
  tipointeres: string = '';
  tasainteres: string = '';
  periodo: string = '';
  pago: string = '';
  id: string = '';
  form: FormGroup = new FormGroup({});

  constructor(private router: Router, private http: HttpClient, private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Amount: [''],
      TotalInstallments: ['']
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
  
  onCronograma() {
    this.router.navigate(['cronograma']);
  }

  aceptar(): void {
    if (this.form.valid) {
      this.loan.amount = this.form.value.Amount;
      this.loan.totalInstallments = this.form.value.TotalInstallments;
      
      this.getClientByDni(this.dni).subscribe(
        (data: any) => {
          this.loan.clientId = data.id;
          this.getContractClientByDni(this.id).subscribe(
            (contractData: any) => {
              if (contractData && contractData.id) {
                this.loan.contractId = contractData.id;
  
                this.userService.createLoad(this.loan).subscribe(
                  (createResponse: any) => {
                    console.log('Loan created successfully:', createResponse);
                    
                    this.userService.calculateAndCreateFrenchInstallments(contractData.id, createResponse.id).subscribe(
                      response => {
                        console.log('Installments calculated and created:', response);
                      },
                      error => {
                        console.error('Error calculating installments:', error);
                      }
                    );
                  },
                  (error: any) => {
                    console.error('Error creating loan:', error);
                    this.mensaje = 'Error al registrar el préstamo. Inténtelo de nuevo.';
                  }
                );
              } else {
                console.error('No contract data found for the client ID.');
              }
            },
            error => {
              console.error('Error fetching contract data:', error);
            }
          );
        },
        error => {
          console.error('Error fetching client data:', error);
        }
      );
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  buscarCliente() {
    this.getClientByDni(this.dni).subscribe(
      (data: any) => {
        this.nombre = data.firstName;
        this.apellidos = data.lastName;
        this.id = data.id;
        this.getContractClientByDni(this.id).subscribe(
          (contractData: any) => {
            if (contractData) {
              this.periodo = contractData.period;
              this.tasainteres = contractData.rate;
              this.tipointeres = contractData.typeRate;
              this.pago = contractData.paymentDay;
            } else {
              console.error('No contract data found for the client.');
            }
          },
          error => {
            console.error('Error fetching contract data:', error);
          }
        );
      },
      error => {
        console.error('Error fetching client data:', error);
      }
    );
  }

  getClientByDni(dni: string): Observable<any> {
    return this.userService.getClientByDni(dni);
  }

  getContractClientByDni(id1: string): Observable<any> {
    return this.userService.GetContractByClientId(id1);
  }
  
}
