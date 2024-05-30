import { Component } from '@angular/core';
import { Employee } from '../_model/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentMapping } from '../_model/enums/department';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { EmployeeService } from '../_service/employee.service';
import { Ticket } from '../_model/ticket.model';
import { TicketService } from '../_service/ticket.service';
import { Account } from '../_model/account.model';
import { Role, RoleMapping } from '../_model/enums/role';
import { AccountService } from '../_service/account.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {
  employee: Employee;
  account: Account;
  updateEmployeeForm: FormGroup;
  updateAccountForm: FormGroup;
  tickets: Ticket[];
  assignedTickets: Ticket[];
  departmentMapping = DepartmentMapping;
  departmentList = Object.values(Department);
  roleMapping = RoleMapping;
  roleList = Object.values(Role);

  constructor(
    private updateEmployeeModalRef: MdbModalRef<EmployeeUpdateComponent>,
    private employeeService: EmployeeService,
    private accountService: AccountService,
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
    this.updateAccountForm = this.formBuilder.group({
      username: [''],
      password: [''],
      confirmPass: [''],
      role: ['']
    })

    this.tickets = [];
    this.ticketService.findAll().subscribe( data => {
      this.tickets = data;
    });
  }

  get employeeForm() { return this.updateEmployeeForm.controls; }
  get accountForm() { return this.updateAccountForm.controls; }
  
  close():void {
    this.updateEmployeeModalRef.close();
  }

  getDepartmentList(dept: Department) {
    return this.departmentList.filter(x => x != dept);
  }

  getRoleList(role: Role) {
    return this.roleList.filter(x => x != role);
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
    this.employee.employeeNumber = this.employeeForm.employeeNumber.value;
    this.employee.firstName = this.employeeForm.firstName.value;
    this.employee.middleName = this.employeeForm.middleName.value;
    this.employee.lastName = this.employeeForm.lastName.value;


    if(this.employeeForm.department.value) {
      this.employee.department = this.employeeForm.department.value;
    }
    if(this.employeeForm.ticket.value){
      this.employeeService.assigneATicket(this.employee.id.toString(), this.employeeForm.ticket.value);
    }

    this.employeeService.update(this.employee);
  }

  updateAccount() {
    if(this.updateAccountForm.invalid) {
      return;
    }

    this.account.username = this.accountForm.username.value;
    this.account.password = this.accountForm.password.value;
    if(this.accountForm.role.value) {
      this.account.role = this.accountForm.role.value;
    }
    if(this.account.employeeId) {
      this.accountService.update(this.account);
    } else {
      this.account.employeeId = this.employee;
      this.accountService.create(this.account);
    }
    

    
  }
}
