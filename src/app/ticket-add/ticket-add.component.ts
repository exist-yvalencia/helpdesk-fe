import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TicketService } from '../_service/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../_model/ticket.model';
import { Employee } from '../_model/employee.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EmployeeService } from '../_service/employee.service';
import { Severity, SeverityMapping } from '../_model/enums/severity';
import { Status, StatusMapping } from '../_model/enums/status';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrl: './ticket-add.component.css'
})
export class TicketAddComponent {
  ticket: Ticket;
  addTicketForm: FormGroup;
  submitted = false;
  watchersError = false;
  watchers: Employee[];
  employeeList: Employee[];
  watchersList: any[];
  selectedWatchers: any[];
  dropdownSettings: IDropdownSettings;

  public severityMapping = SeverityMapping;
  public severityList = Object.values(Severity);
  public statusMapping = StatusMapping;
  public statusList = Object.values(Status);

  constructor(
    private addTicketModalRef: MdbModalRef<TicketAddComponent>,
    private ticketService: TicketService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.addTicketForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      severity: ['',Validators.required],
      assignee: [''],
      selectedWatchers: [{}, Validators.required]
    });
    this.ticket = new Ticket();
    this.watchers = [];
    this.employeeService.findAll().subscribe(list => {
      this.employeeList = list;
      this.watchersList = this.getWatchersList(list);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true
    };
  }

  getWatchersList(employeeList: Employee[]): any[] {
    let list: Array<any> = [];
    employeeList.forEach(x => {
      list.push({id: x.id, name: x.employeeNumber+": "+x.firstName+" "+x.middleName+" "+x.lastName});
    });
    return list;
  }

  get f() { return this.addTicketForm.controls; }

  close() {
    this.addTicketModalRef.close();
  }

  addTicket() {
    this.submitted = true;

    if(!this.f.selectedWatchers.value.length) {
      this.watchersError = true;
      return;
    }

    if(this.addTicketForm.invalid) {
      return;
    }

    this.ticket.title = this.f.title.value;
    this.ticket.description = this.f.description.value;
    this.ticket.status = this.f.status.value;
    this.ticket.severity = this.f.severity.value;
    this.f.selectedWatchers.value.forEach(
      (data: { id: number; }) => this.watchers.push(this.employeeList.find(employee => employee.id === data.id)!)
    );
    this.ticket.watchers = this.watchers;

    this.ticketService.create(this.ticket);
    this.addTicketModalRef.close();
  }
}
