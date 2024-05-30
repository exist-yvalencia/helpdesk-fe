import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../_model/employee.model';
import { EmployeeService } from '../_service/employee.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { Subscription } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { environment } from '../../environments/environment';
import { PaginationInstance } from 'ngx-pagination';
import { AccountService } from '../_service/account.service';

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
  tableConfig: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0
  }

  @ViewChild('filter') filterKey: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private modalService: MdbModalService,
    private toast: NgToastService
  ) { 
    
  }

  ngOnInit(): void {
    this.getTotalSize();
    this.findAll(this.tableConfig.currentPage-1);
    this.updateTableSubscription = this.employeeService.updateTable().subscribe((text) => {
      this.resetTable();
      if(text.includes("Error")) {
        this.toast.error({detail: text, duration: 5000});
      } else {
        this.toast.success({detail: text, duration: 5000})
      }
    });

    this.updateTableSubscription = this.accountService.getResponse().subscribe((text) => {
      if(text.includes("Error")) {
        this.toast.error({detail: text, duration: 5000});
      } else {
        this.toast.success({detail: text, duration: 5000})
      }
    });
  }

  private findAll(page: number) {
    this.employeeService.findAllByPage(page, this.tableConfig.itemsPerPage).subscribe(data => {
      this.employees = data;
      this.filteredEmployeeList = this.employees;
    });
  }

  private search(text: string, page: number) {
    this.employeeService.search(text, page, this.tableConfig.itemsPerPage).subscribe(
      data => {
        this.filteredEmployeeList = data;
        console.log(page+" "+this.tableConfig.itemsPerPage);
    });
  }

  filterEmployee(text: string) {
    if(!text) {
      this.filteredEmployeeList = this.employees;
      return;
    }
    this.tableConfig.currentPage = 1;
    this.employeeService.getSearchSize(text).subscribe(
      data => {
        this.tableConfig.totalItems = data;
    });
    this.search(text, this.tableConfig.currentPage-1);
  }

  onPageChange(number: number){
    this.tableConfig.currentPage = number;
    if(this.filterKey.nativeElement.value) {
      this.search(this.filterKey.nativeElement.value, this.tableConfig.currentPage-1);
    } else {
      this.findAll(this.tableConfig.currentPage-1);
    }
  }

  getTotalSize() {
    this.employeeService.getListSize().subscribe(data => {
      this.tableConfig.totalItems = data;
    });
  }

  resetTable() {
    this.getTotalSize();
    this.tableConfig.currentPage = 1;
    this.findAll(this.tableConfig.currentPage-1);
  }

  clearFilter() {
    this.filterKey.nativeElement.value = '';
    this.resetTable();
  }

  openAddEmployeeModal() {
    const currentRole = sessionStorage.getItem('role')?.replace(/['"]+/g, '');
    if(currentRole == environment.ROLE_ADMIN){
      this.addEmployeeModalRef = this.modalService.open(EmployeeAddComponent);
    }else if(currentRole == environment.ROLE_USER){
      this.toast.error({detail: "User has no access to this feature.", duration: 5000});
    }
  }

}
