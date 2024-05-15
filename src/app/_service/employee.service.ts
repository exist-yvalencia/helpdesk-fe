import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Employee } from '../_model/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private subject = new Subject<any>();
  
  constructor(private http: HttpClient) {
  }

  public findById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.apiUrl}/employee?id=${id}`);
  }

  public findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/employee/all`);
  }

  public create(employee: Employee): void {
    this.http.post(`${environment.apiUrl}/employee/add`, employee, {observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }          
        }
      },
      error: err => {
        this.subject.next("Error: Failed adding employee.");
      }
    });
  }

  public update(employee: Employee): void {
    this.http.patch(`${environment.apiUrl}/employee/update`, employee, {observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }
        }
      },
      error: err => {
        this.subject.next("Error: Failed updating employee.");
      }
    });
  }

  public assigneATicket(id: string, ticketNumber: string): void {
    let params = new HttpParams()
                      .set('id', id)
                      .set('ticketNumber', ticketNumber);
            
    this.http.post(`${environment.apiUrl}/employee/assign-ticket`, null, {params: params, observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }
        }
      },
      error: err => {
        this.subject.next("Error: Failed assigning ticket to employee.")
      }
    });
  }

  public delete(id: string): void{
    this.http.delete(`${environment.apiUrl}/employee/delete?id=${id}`, {observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }
        }
      },
      error: err => {
        this.subject.next("Error: Failed deleting employee.")
      }
    });
  }

  updateTable(): Observable<any>{ 
    return this.subject.asObservable();
  }
}