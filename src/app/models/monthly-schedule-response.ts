import { ClientResponse } from "./client-response";
import { ScheduleResponse } from "./schedule-response";

export class MonthlyScheduleResponse {
    id: number= 0;
    month: number= 0;
    year: number= 0;
    status: string= '';
    clientId: number= 0;
    client: ClientResponse = new ClientResponse();
    scheduleId: number= 0;
    schedule: ScheduleResponse = new ScheduleResponse();
    dateCreated: string= '';
}

