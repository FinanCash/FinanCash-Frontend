import { UserResponse } from "./user-response";

export class ClientResponse {
    id: number= 0;
    firstName: string= '';
    lastName: string= '';
    dni: string= '';
    phone: string= '';
    address: string= '';
    creditLimit: number= 0;
    birthDate: string= '';  // Utilizamos string para representar la fecha
    userId: number= 0;
    user: UserResponse = new UserResponse();
    dateCreated: string= '';
}
