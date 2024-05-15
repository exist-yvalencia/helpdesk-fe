import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { EmployeeService } from '../_service/employee.service';
import { Employee } from '../_model/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, DepartmentMapping } from '../_model/enums/department';
import { NgToastService } from 'ng-angular-popup';

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
  public departmentMapping = DepartmentMapping;
  public departmentList = Object.values(Department);

  constructor(
    private addEmployeeModalRef: MdbModalRef<EmployeeAddComponent>,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
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
    
    this.employeeService.create(this.employee);
    this.addEmployeeModalRef.close();
  }
}
