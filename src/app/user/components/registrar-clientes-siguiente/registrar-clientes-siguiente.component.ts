import {Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable,
    MatTableModule
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ContractResponse } from '../../../models/contract-response';
import { ContractRequest } from '../../../models/contract-request';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-registrar-clientes-siguiente',
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
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './registrar-clientes-siguiente.component.html',
  styleUrl: './registrar-clientes-siguiente.component.css'
})
export class RegistrarClientesSiguienteComponent implements OnInit {

  contrato: ContractRequest = new ContractRequest();
  form: FormGroup = new FormGroup({});
  id: number = 0;
  edicion: boolean = false;
  mensaje: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

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

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.userService.GetContractByClientId(this.id.toString()).subscribe(
        (data) => {
          this.edicion = true;
          if (this.edicion) {
            this.initForm();
          }
        },
        (error) => {
          console.error('Error al obtener el contrato:', error);
          this.edicion = false;
        }
      );
    });

    this.form = this.formBuilder.group({
      typeRate: ['', Validators.required],
      rate: ['',],
      period: ['', Validators.required],
      paymentDay: ['', Validators.required],
      typePenaltyRate: ['', Validators.required],
      penaltyRate: ['',],
      penaltyPeriod: ['', Validators.required],
    });
  }

  initForm() {
    if (this.edicion) {
      this.userService.GetContractByClientId(this.id.toString()).subscribe((data) => {
        this.form = this.formBuilder.group({
          typeRate: new FormControl(data.typeRate, Validators.required),
          rate: new FormControl(data.rate, [Validators.required, Validators.pattern("^[0-9]*$")]),
          period: new FormControl(data.period, Validators.required),
          paymentDay: new FormControl(data.paymentDay, Validators.required),
          typePenaltyRate: new FormControl(data.typePenaltyRate, Validators.required),
          penaltyRate: new FormControl(data.penaltyRate, [Validators.required, Validators.pattern("^[0-9]*$")]),
          penaltyPeriod: new FormControl(data.penaltyPeriod, Validators.required),
        });
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.contrato.typeRate = this.form.value.typeRate;
      this.contrato.rate = this.form.value.rate;
      this.contrato.period = this.form.value.period;
      this.contrato.paymentDay = this.formatDate(this.form.value.paymentDay);
      this.contrato.typePenaltyRate = this.form.value.typePenaltyRate;
      this.contrato.penaltyRate = this.form.value.penaltyRate;
      this.contrato.penaltyPeriod = this.form.value.penaltyPeriod;
      this.route.params.subscribe((data: Params) => {
        this.contrato.clientId = data['id'];
      });

      if (this.edicion) {
        this.userService.GetContractByClientId(this.id.toString()).subscribe((data: any) => {
          const contratoId = data.id;
          this.userService.updateContract(contratoId, this.contrato).subscribe(() => {
            this.router.navigate(['clientes']);
          });
        });
      } else {
        this.userService.createContract(this.contrato).subscribe(() => {
          this.router.navigate(['clientes']);
        });
      }
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  goBack(): void {
    this.router.navigate(['clientes']);
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