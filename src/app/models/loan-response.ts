import { ClientResponse } from "./client-response";
import { ContractResponse } from "./contract-response";

export class LoanResponse {
    id: number= 0;
  amount: number= 0;
  totalInstallments: number= 0;
  clientId: number= 0;
  client: ClientResponse = new ClientResponse();
  contractId: number= 0;
  contract: ContractResponse= new ContractResponse();
  dateCreated: string='';
}
