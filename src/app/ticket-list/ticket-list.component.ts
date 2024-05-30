import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ticket } from '../_model/ticket.model';
import { TicketService } from '../_service/ticket.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NgToastService } from 'ng-angular-popup';
import { TicketAddComponent } from '../ticket-add/ticket-add.component';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginationInstance } from 'ngx-pagination';

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
  tableConfig: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0
  }

  @ViewChild('filter') filterKey: ElementRef;

  constructor(
    private ticketService: TicketService,
    private modalService: MdbModalService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getTotalSize();
    this.findAll(this.tableConfig.currentPage-1);
    this.updateTableSubscription = this.ticketService.updateTable().subscribe((text) => {
      this.resetTable();
      if(text.includes("Error")) {
        this.toast.error({detail: text, duration: 5000});
      } else {
        this.toast.success({detail: text, duration: 5000})
      }
    });
  }

  private findAll(page: number) {
    this.ticketService.findAllByPage(page, this.tableConfig.itemsPerPage).subscribe(data => {
      this.tickets = data;
      this.filteredTicketList = this.tickets;
    });
  }

  private search(text: string, page: number) {
    this.ticketService.search(text, page, this.tableConfig.itemsPerPage).subscribe(
      data => {
        this.filteredTicketList = data;
    });
  }

  filterTicket(text: string) {
    if(!text) {
      this.resetTable();
      return;
    }
    this.tableConfig.currentPage = 1;
    this.ticketService.getSearchSize(text).subscribe(
      data => {
        this.tableConfig.totalItems = data;
    });

    this.search(text, this.tableConfig.currentPage-1);
  }

  getTotalSize() {
    this.ticketService.getListSize().subscribe(data => {
      this.tableConfig.totalItems = data;
    });
  }

  resetTable() {
    this.getTotalSize();
    this.tableConfig.currentPage = 1;
    this.findAll(this.tableConfig.currentPage-1);
  }

  onPageChange(number: number){
    this.tableConfig.currentPage = number;
    if(this.filterKey.nativeElement.value) {
      this.search(this.filterKey.nativeElement.value, this.tableConfig.currentPage-1);
    } else {
      this.findAll(this.tableConfig.currentPage-1);
    }
  }

  clearFilter() {
    this.filterKey.nativeElement.value = '';
    this.resetTable();
  }

  openAddTicketModal() {
    const currentRole = sessionStorage.getItem('role')?.replace(/['"]+/g, '');
    if(currentRole == environment.ROLE_ADMIN){
      this.addTicketModalRef = this.modalService.open(TicketAddComponent);  
    } else if(currentRole == environment.ROLE_USER) {
      this.toast.error({detail: "User has no access to this feature.", duration: 5000});
    }
  }
}
