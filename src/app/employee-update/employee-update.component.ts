import { Component } from '@angular/core';
import { Employee } from '../_model/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentMapping } from '../_model/enums/department';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { EmployeeService } from '../_service/employee.service';
import { Ticket } from '../_model/ticket.model';
import { TicketService } from '../_service/ticket.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {
  employee: Employee;
  updateEmployeeForm: FormGroup;
  submitted = false;
  error = '';
  tickets: Ticket[];
  assignedTickets: Ticket[];
  public departmentMapping = DepartmentMapping;
  public departmentList = Object.values(Department);

  constructor(
    private updateEmployeeModalRef: MdbModalRef<EmployeeUpdateComponent>,
    private employeeService: EmployeeService,
    private ticketService: TicketService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.updateEmployeeForm = this.formBuilder.group({
      employeeNumber: [''],
      department: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      ticket: ['']
    });
    this.tickets = [];
    this.ticketService.findAll().subscribe( data => {
      this.tickets = data;
    });
  }

  get f() { return this.updateEmployeeForm.controls; }
  
  close():void {
    this.updateEmployeeModalRef.close();
  }

  getDepartmentList(dept: Department) {
    return this.departmentList.filter(x => x != dept);
  }

  getTicketList(): Ticket[] {
    return this.tickets.filter(x => {
      if(x.assignee != null) {
        return false;
      }
      return true;
    });
  }

  updateEmployee() {
    this.submitted = true;

    this.employee.employeeNumber = this.f.employeeNumber.value;
    this.employee.firstName = this.f.firstName.value;
    this.employee.middleName = this.f.middleName.value;
    this.employee.lastName = this.f.lastName.value;


    if(this.f.department.value) {
      this.employee.department = this.f.department.value;
    }
    if(this.f.ticket.value){
      this.employeeService.assigneATicket(this.employee.id.toString(), this.f.ticket.value);
    }

    this.employeeService.update(this.employee);
    this.updateEmployeeModalRef.close();
  }
}
