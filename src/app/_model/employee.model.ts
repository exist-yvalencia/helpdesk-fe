import { Department } from "./enums/department";

export class Employee {
    id: number;
    employeeNumber: string;
    firstName: string;
    middleName: string;
    lastName: string;
    department: Department
}