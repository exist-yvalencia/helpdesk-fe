import { Component, Input } from '@angular/core';
import { EmployeeService } from '../_service/employee.service';
import { TicketService } from '../_service/ticket.service';
import { Employee } from '../_model/employee.model';
import { Ticket } from '../_model/ticket.model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EmployeeViewComponent } from '../employee-view/employee-view.component';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';
import { TicketViewComponent } from '../ticket-view/ticket-view.component';
import { TicketUpdateComponent } from '../ticket-update/ticket-update.component';
import { environment } from '../../environments/environment';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-module-actions',
  templateUrl: './module-actions.component.html',
  styleUrl: './module-actions.component.css'
})
export class ModuleActionsComponent {
  @Input()
  id: number;
  employee: Employee;
  ticket: Ticket;
  assignedTickets: Ticket[];
  employeeList: Employee[];
  viewEmployeeModalRef: MdbModalRef<EmployeeViewComponent> | null = null;
  updateEmployeeModalRef: MdbModalRef<EmployeeUpdateComponent> | null = null;

  viewTicketModalRef:MdbModalRef<TicketViewComponent> | null = null;
  updateTicketModalRef: MdbModalRef<TicketUpdateComponent> | null = null;

  constructor(
    private employeeService: EmployeeService,
    private modalService: MdbModalService,
    private ticketService: TicketService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    if(sessionStorage.getItem('activeView') == 'employee') {
      this.employeeService.findById(`${this.id}`).subscribe(data => {
        this.employee = data;
      });
      this.ticketService.findByAssignee(`${this.id}`).subscribe(data => {
        this.assignedTickets = data;
      });
    } else if(sessionStorage.getItem('activeView') == 'ticket'){
      this.ticketService.findById(`${this.id}`).subscribe(data => {
        this.ticket = data;
      });

      this.employeeService.findAll().subscribe(data => {
        this.employeeList = data;
      })
    }
  }

  view() {
    if(sessionStorage.getItem('activeView') == 'employee') {
      let config = {
        data: {
          employee: this.employee,
          assignedTickets: this.assignedTickets
        }
      }

      this.viewEmployeeModalRef = this.modalService.open(EmployeeViewComponent, config);
    } else if(sessionStorage.getItem('activeView') == 'ticket'){
      let config = {
        data: {
          ticket: this.ticket
        }
      }
      this.viewTicketModalRef = this.modalService.open(TicketViewComponent, config)
    }
  }

  update() {
    if(sessionStorage.getItem('role') == environment.ROLE_ADMIN) {
      if(sessionStorage.getItem('activeView') == 'employee') {
        let config = {
          data: {
            employee: this.employee,
            assignedTickets: this.assignedTickets
          }
        }
        this.updateEmployeeModalRef = this.modalService.open(EmployeeUpdateComponent, config);
      } else if(sessionStorage.getItem('activeView') == 'ticket'){
        let config = {
          data: {
            ticket: this.ticket
          }
        }
        this.updateTicketModalRef = this.modalService.open(TicketUpdateComponent, config);
      }
    } else if(sessionStorage.getItem('role') == environment.ROLE_USER){
      this.toast.error({detail: "User has no access to this feature.", duration: 5000});
    }
    
  }

  delete() {
    if(sessionStorage.getItem('role') == environment.ROLE_ADMIN) {
      if(sessionStorage.getItem('activeView') == 'employee') {
        this.employeeService.delete(`${this.id}`);
      } else if(sessionStorage.getItem('activeView') == 'ticket'){
        this.ticketService.delete(`${this.id}`);
      }
    } else if(sessionStorage.getItem('role') == environment.ROLE_USER){
      this.toast.error({detail: "User has no access to this feature.", duration: 5000});
    }
  }
}
