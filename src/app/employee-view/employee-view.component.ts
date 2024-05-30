import { Component, OnInit } from '@angular/core';
import { Employee } from '../_model/employee.model';
import { Ticket } from '../_model/ticket.model';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Account } from '../_model/account.model';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css'
})
export class EmployeeViewComponent implements OnInit{
  data: any;
  employee: Employee;
  account: Account;
  assignedTickets: Ticket[];

  constructor(
    private viewEmployeeModalRef: MdbModalRef<EmployeeViewComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.viewEmployeeModalRef.close();
  }
}
