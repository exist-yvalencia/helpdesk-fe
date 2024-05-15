import { Employee } from "./employee.model";
import { Severity } from "./enums/severity";
import { Status } from "./enums/status";

export class Ticket {
    ticketNumber: number;
    title: string;
    description: string;
    severity: Severity;
    status: Status;
    assignee: Employee;
    watchers: Employee[];
}