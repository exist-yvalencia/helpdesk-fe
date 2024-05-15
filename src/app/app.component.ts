import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Helpdesk';

  constructor(
    private router: Router
  ){ }

  ngOnInit(): void {
    this.router.navigateByUrl('');
  }

  goToHome() {
    if(sessionStorage.getItem('token')){
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('');
    }
  }
}
