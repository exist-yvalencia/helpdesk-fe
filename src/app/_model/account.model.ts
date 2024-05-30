import { Employee } from "./employee.model";
import { Role } from "./enums/role";

export class Account {
    id: number;
    username: string;
    password: string;
    role: Role;
    employeeId: Employee;
}
