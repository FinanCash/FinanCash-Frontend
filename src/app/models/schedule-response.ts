import { ClientResponse } from "./client-response";
import { LoanResponse } from "./loan-response";

export class ScheduleResponse {
    id: number= 0;
  installmentNumber: number= 0;
  amortization: number= 0;
  interest: number= 0;
  installmentAmount: number= 0;
  dueDate: string= '';  // Utilizamos string para representar la fecha
  clientId: number= 0;
  client: ClientResponse = new ClientResponse();
  loanId: number= 0;
  loan: LoanResponse= new LoanResponse();
  dateCreated: string= '';
}
