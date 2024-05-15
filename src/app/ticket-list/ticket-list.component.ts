import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ticket } from '../_model/ticket.model';
import { TicketService } from '../_service/ticket.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgToastService } from 'ng-angular-popup';
import { TicketAddComponent } from '../ticket-add/ticket-add.component';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../_service/employee.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {
  tickets: Ticket[];
  filteredTicketList: Ticket[];
  addTicketModalRef: MdbModalRef<TicketAddComponent> | null = null;
  updateTableSubscription: Subscription;

  @ViewChild('filter') filterKey: ElementRef;

  constructor(
    private ticketService: TicketService,
    private employeeService: EmployeeService,
    private modalService: MdbModalService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.updateTableSubscription = this.ticketService.updateTable().subscribe((text) => {
      this.findAll();
      if(text.includes("Error")) {
        this.toast.error({detail: text, duration: 5000});
      } else {
        this.toast.success({detail: text, duration: 5000})
      }
    });
  }

  private findAll() {
    this.ticketService.findAll().subscribe(data => {
      this.tickets = data;
      this.filteredTicketList = this.tickets;
    })
  }

  filterTicket(text: string) {
    if(!text) {
      this.filteredTicketList = this.tickets;
      return;
    }

    this.filteredTicketList = this.tickets.filter(
    data => data?.ticketNumber.toString() == text ||
            data?.title.toLowerCase().includes(text.toLowerCase()) ||
            data?.severity.toLowerCase() == text.toLowerCase() ||
            data?.status.toLowerCase() == text.toLowerCase()
    )
  }

  clearFilter() {
    this.filterKey.nativeElement.value = '';
    this.filteredTicketList = this.tickets;
  }

  openAddTicketModal() {
    if(sessionStorage.getItem('role') == environment.ROLE_ADMIN){
      this.addTicketModalRef = this.modalService.open(TicketAddComponent);  
    } else if(sessionStorage.getItem('role') == environment.ROLE_USER) {
      this.toast.error({detail: "User has no access to this feature.", duration: 5000});
    }
  }
}
