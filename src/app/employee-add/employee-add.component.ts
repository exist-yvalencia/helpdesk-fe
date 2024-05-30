import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EmployeeService } from '../_service/employee.service';
import { Employee } from '../_model/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentMapping } from '../_model/enums/department';
import { NgToastService } from 'ng-angular-popup';
import { Account } from '../_model/account.model';
import { AccountAddComponent } from '../account-add/account-add.component';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
  employee: Employee;
  addEmployeeForm: FormGroup;
  submitted = false;
  error = '';
  departmentMapping = DepartmentMapping;
  departmentList = Object.values(Department);
  addAccountModalRef:MdbModalRef<AccountAddComponent> | null = null;

  constructor(
    private addEmployeeModalRef: MdbModalRef<EmployeeAddComponent>,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private modalService: MdbModalService,
  ){ }

  ngOnInit() {
    this.addEmployeeForm = this.formBuilder.group({
      employeeNumber: ['', Validators.required],
      department: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.employee = new Employee();
  }
  get f() { return this.addEmployeeForm.controls; }

  close():void {
    this.addEmployeeModalRef.close();
  }

  addEmployee() {
    this.submitted = true;

    if(this.addEmployeeForm.invalid) {
      return;
    }

    this.employee.employeeNumber = this.f.employeeNumber.value;
    this.employee.department = this.f.department.value;
    this.employee.firstName = this.f.firstName.value;
    this.employee.middleName = this.f.middleName.value;
    this.employee.lastName = this.f.lastName.value;
    
    this.employeeService.create(this.employee).subscribe(res => {
      if(res != null) {
        let config = {
          data: {
            employee: res
          }
        }
        this.employeeService.createResponse("Employee successfully created");
        this.addAccountModalRef = this.modalService.open(AccountAddComponent, config);
      } else {
        this.employeeService.createResponse("Failed creating employee");
      }
    });
    
    this.addEmployeeModalRef.close();
  }
}
