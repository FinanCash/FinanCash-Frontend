import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  
import { UserResponse } from '../models/user-response';
import { UserRequest } from '../models/user-request';
import { ScheduleRequest } from '../models/schedule-request';
import { ScheduleResponse } from '../models/schedule-response';
import { MonthlyScheduleRequest } from '../models/monthly-schedule-request';
import { MonthlyScheduleResponse } from '../models/monthly-schedule-response';
import { ContractRequest } from '../models/contract-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Client methods
  getClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Client/GetAll`, {
      headers: new HttpHeaders({
        'accept': 'text/plain'
      })
    });
  }

  getClientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Client/GetById/${id}`, {
      headers: new HttpHeaders({
        'accept': 'text/plain'
      })
    });
  }

  getClientByDni(dni: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Client/GetByDni?dni=${dni}`, {
      headers: new HttpHeaders({
        'accept': 'text/plain'
      })
    });
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Client/Delete/${id}`, {
      headers: new HttpHeaders({
        'accept': 'text/plain'
      })
    });
  }

  addClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Client/Post`, client, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  GetContractByClientId(clientId: string): Observable<any> {
    const url = `${this.apiUrl}/Contract/GetByClientId/${clientId}`;
    return this.http.get<ContractRequest>(url, {
      headers: new HttpHeaders({
        'Accept': 'application/json' // Ajusta el header 'accept' si es necesario
      })
    });
  }

  createContract(contract: any): Observable<any> {
    const url = `${this.apiUrl}/Contract/Post`;
    return this.http.post(url, contract, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateContract(id: number, contract: any): Observable<any> {
    const url = `${this.apiUrl}/Contract/Put/${id}`;
    return this.http.put(url, contract, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  createLoad(load: any): Observable<any> {
    const url = `${this.apiUrl}/Loan/Post`;
    return this.http.post(url, load, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  calculateAndCreateFrenchInstallments(contractId: number, loanId: number): Observable<any> {
    const url = `${this.apiUrl}/Schedule/CalculateAndCreateFrenchInstallments`;
    let params = new HttpParams();
    params = params.append('contractId', contractId.toString());
    params = params.append('loanId', loanId.toString());

    return this.http.post(url, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params
    });
  }

 
  getLoanDetailsByDni(dni: string): Observable<any> {
    const url = `${this.apiUrl}/Loan/GetLoanDetailsByDni?dni=${dni}`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    });
  }


  getAllDebt(): Observable<any> {
    const url = `${this.apiUrl}/MonthlySchedule/GetAllDebt`;

    return this.http.get(url, {
      headers: new HttpHeaders({
        'accept': 'application/json'
      })
    });
  }

  updateMonthlyScheduleStatus(id: number): Observable<any> {
    const url = `${this.apiUrl}/MonthlySchedule/UpdateMonthlyScheduleStatus/${id}`;

    return this.http.put(url, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    });
  }

  

}