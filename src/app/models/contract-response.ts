
import { ClientResponse } from "./client-response";

export class ContractResponse {
    id: number= 0;
    typeRate: string='';
    rate: number= 0;
    period: string='';
    typePenaltyRate: string='';
    penaltyRate: number= 0;
    penaltyPeriod: string='';
    paymentDay: string=''; // Utilizamos string para representar la fecha
    tem: number= 0;
    clientId: number= 0;
    client: ClientResponse = new ClientResponse();
    dateCreated: string='';
}
