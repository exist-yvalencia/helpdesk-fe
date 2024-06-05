import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../_model/account.model';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private subject = new Subject<any>();
  
  constructor(private http: HttpClient) {
  }

  public create(account: Account): void {
    this.http.post(`${environment.apiUrl}/account/add`, account, {observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }          
        }
      },
      error: err => {
        this.subject.next("Error: Failed creating an account.");
      }
    });
  }

  public findByEmployeeId(employeeId: string): Observable<Account>{
    return this.http.get<Account>(`${environment.apiUrl}/account?employeeId=${employeeId}`);
  }

  public update(account: Account): void{
    this.http.post(`${environment.apiUrl}/account/update`, account, {observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }          
        }
      },
      error: err => {
        this.subject.next("Error: Failed updating account.");
      }
    });
  }

  getResponse(): Observable<any>{ 
    return this.subject.asObservable();
  }
}
