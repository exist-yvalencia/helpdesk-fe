import { Component } from '@angular/core';
import { Account } from '../_model/account.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AccountService } from '../_service/account.service';
import { Role, RoleMapping } from '../_model/enums/role';
import { Employee } from '../_model/employee.model';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrl: './account-add.component.css'
})
export class AccountAddComponent {
  employee: Employee;
  account: Account;
  addAccountForm: FormGroup;
  submitted = false;
  roleMapping = RoleMapping;
  roleList = Object.values(Role);

  constructor(
    private addAccountModalRef: MdbModalRef<AccountAddComponent>,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private modalService: MdbModalService,
  ){}

  ngOnInit() {
    this.addAccountForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.account = new Account();
  }

  close(){
    this.addAccountModalRef.close();
  }

  get f() { return this.addAccountForm.controls; }

  addAccount() {
    this.submitted = true;

    if(this.addAccountForm.invalid) {
      return;
    }

    this.account.username = this.f.username.value;
    this.account.password = this.f.password.value;
    this.account.role = this.f.role.value;
    this.account.employeeId = this.employee;
    console.log(this.employee);

    this.accountService.create(this.account);
    this.addAccountModalRef.close();
  }
}
