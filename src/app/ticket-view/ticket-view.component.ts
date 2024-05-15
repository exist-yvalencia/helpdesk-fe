import { Component } from '@angular/core';
import { Ticket } from '../_model/ticket.model';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrl: './ticket-view.component.css'
})
export class TicketViewComponent {
  ticket: Ticket;

  constructor(
    private viewTicketModalRef: MdbModalRef<TicketViewComponent>
  ) { }

  close() {
    this.viewTicketModalRef.close();
  }
}
