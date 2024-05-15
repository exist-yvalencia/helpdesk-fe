import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../_model/employee.model';
import { EmployeeService } from '../_service/employee.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { Subscription } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: Employee[];
  filteredEmployeeList: Employee[];
  addEmployeeModalRef: MdbModalRef<EmployeeAddComponent> | null = null;
  updateTableSubscription: Subscription;

  @ViewChild('filter') filterKey: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private modalService: MdbModalService,
    private toast: NgToastService
  ) { 
    
  }

  ngOnInit(): void {
    this.findAll();
    this.updateTableSubscription = this.employeeService.updateTable().subscribe((text) => {
      this.findAll();
      if(text.includes("Error")) {
        this.toast.error({detail: text, duration: 5000});
      } else {
        this.toast.success({detail: text, duration: 5000})
      }
    });
  }

  private findAll() {
    this.employeeService.findAll().subscribe(data => {
      this.employees = data;
      this.filteredEmployeeList = this.employees;
    });
  }

  filterEmployee(text: string) {
    if(!text) {
      this.filteredEmployeeList = this.employees;
      return;
    }

    this.filteredEmployeeList = this.employees.filter(
      data => data?.employeeNumber.toLowerCase().includes(text.toLowerCase()) ||
              data?.firstName.toLowerCase().includes(text.toLowerCase()) ||
              data?.middleName.toLowerCase().includes(text.toLowerCase()) ||
              data?.lastName.toLowerCase().includes(text.toLowerCase()) ||
              data?.department.toLowerCase().includes(text.toLowerCase())
    );
  }

  clearFilter() {
    this.filterKey.nativeElement.value = '';
    this.filteredEmployeeList = this.employees;
  }

  openAddEmployeeModal() {
    if(sessionStorage.getItem('role') == environment.ROLE_ADMIN){
      this.addEmployeeModalRef = this.modalService.open(EmployeeAddComponent);
    }else if(sessionStorage.getItem('role') == environment.ROLE_USER){
      this.toast.error({detail: "User has no access to this feature.", duration: 5000});
    }
  }

}
