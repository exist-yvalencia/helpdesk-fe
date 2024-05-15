import { Component, Input } from '@angular/core';
import { Ticket } from '../_model/ticket.model';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from '../_model/employee.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Severity, SeverityMapping } from '../_model/enums/severity';
import { Status, StatusMapping } from '../_model/enums/status';
import { TicketService } from '../_service/ticket.service';
import { EmployeeService } from '../_service/employee.service';

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrl: './ticket-update.component.css'
})
export class TicketUpdateComponent {
  ticket: Ticket;
  updateTicketForm: FormGroup;
  submitted = false;
  initialWatchers: Employee[];
  employeeList: Employee[];
  watchersList: any[];
  watchers: any[];
  dropdownSettings: IDropdownSettings;

  public severityMapping = SeverityMapping;
  public severityList = Object.values(Severity);
  public statusMapping = StatusMapping;
  public statusList = Object.values(Status);

  // @Input('ticket') ticket: Ticket;

  constructor(
    private updateTicketModalRef: MdbModalRef<TicketUpdateComponent>,
    private ticketService: TicketService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit() {
    this.updateTicketForm = this.formBuilder.group({
      title: [''],
      description: [''],
      status: [''],
      severity: [''],
      assignee: [''],
      selectedWatchers: [{}]
    });
    this.watchers = [];
    this.employeeList = [];
    this.employeeService.findAll().subscribe(list => {
      this.employeeList = list;
      this.watchersList = this.getWatchersList(list);
    });

    this.f.selectedWatchers.setValue(this.getInitialWatchers());

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true
    };
  }

  getAssigneeList(assignee: Employee): Employee[] {
    if(assignee){
      return this.employeeList.filter(
        data => data.id != assignee.id
      );
    }
    return this.employeeList;
  }

  getStatusList(status: Status) {
    return this.statusList.filter(x => x != status);
  }

  getSeverityList(severity: Severity) {
    return this.severityList.filter(x => x != severity);
  }

  getInitialWatchers(): any[] {
    let list: Array<any> = [];
    this.ticket.watchers.forEach(x => {
      list.push({id: x.id, name: x.employeeNumber+": "+x.firstName+" "+x.middleName+" "+x.lastName});
      
    });
    return list;
  }

  getWatchersList(employeeList: Employee[]): any[] {
    let list: Array<any> = [];
    employeeList.forEach(x => {
      list.push({id: x.id, name: x.employeeNumber+": "+x.firstName+" "+x.middleName+" "+x.lastName});
      
    });
    return list;
  }

  get f() { return this.updateTicketForm.controls; }

  close() {
    this.updateTicketModalRef.close();
  }

  updateTicket() {
    this.submitted = true;

    this.ticket.title = this.f.title.value;
    this.ticket.description = this.f.description.value;

    if(this.f.status.value) {
      this.ticket.status = this.f.status.value;
    }

    if(this.f.severity.value) {
      this.ticket.severity = this.f.severity.value;
    }

    if(this.f.assignee.value) {
      this.ticket.assignee = this.employeeList.find(employee => employee.id === this.f.assignee.value)!;
    }

    this.f.selectedWatchers.value.forEach(
      (data: { id: number; }) => this.watchers.push(this.employeeList.find(employee => employee.id === data.id)!)
    );
    this.ticket.watchers = this.watchers;

    this.ticketService.update(this.ticket);
    this.updateTicketModalRef.close();
  }
}
