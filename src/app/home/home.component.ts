import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public isEmployeeViewActive: boolean;
  public isTicketViewActive: boolean;
  username: string;

  constructor() {
    this.username = sessionStorage.getItem('username')!;
  }

  ngOnInit() {
    this.isEmployeeViewActive = true;
    sessionStorage.setItem('activeView', 'employee');
  }

  setEmployeeView() {
    this.isEmployeeViewActive = true;
    this.isTicketViewActive = false;
    sessionStorage.setItem('activeView', 'employee');
  }

  setTicketView() {
    this.isTicketViewActive = true;
    this.isEmployeeViewActive = false;
    sessionStorage.setItem('activeView', 'ticket');
  }
}
