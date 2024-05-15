import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    if(sessionStorage.getItem('token')){
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('activeView');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
