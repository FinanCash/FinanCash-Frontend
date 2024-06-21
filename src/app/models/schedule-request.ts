export class ScheduleRequest {
    installmentNumber: number= 0;
    amortization: number= 0;
    interest: number= 0;
    installmentAmount: number= 0;
    dueDate: string= '';  // Utilizamos string para representar la fecha
    clientId: number= 0;
    loanId: number= 0;
}
