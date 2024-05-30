import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ticket } from '../_model/ticket.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  public findById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${environment.apiUrl}/ticket?id=${id}`);
  }

  public findAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${environment.apiUrl}/ticket/all`);
  }

  public findAllByPage(number: number, size: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${environment.apiUrl}/ticket/all?page=${number}&size=${size}`);
  }

  public getListSize() {
    return this.http.get<number>(`${environment.apiUrl}/ticket/all/size`);
  }

  public search(text: string, page: number, size: number) {
    return this.http.get<Ticket[]>(`${environment.apiUrl}/ticket/search?text=${text}&page=${page}&size=${size}`);
  }
  
  public getSearchSize(text: string) {
    return this.http.get<number>(`${environment.apiUrl}/ticket/search/size?text=${text}`);
  }

  public findByAssignee(employeeId: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${environment.apiUrl}/ticket/by-assignee?employeeId=${employeeId}`);
  }

  public create(ticket: Ticket): void {
    this.http.post(`${environment.apiUrl}/ticket/add`, ticket, {observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }          
        }
      },
      error: err => {
        this.subject.next("Error: Failed adding ticket.");
      }
    });
  }

  public update(ticket: Ticket): void{
    this.http.patch(`${environment.apiUrl}/ticket/update`, ticket, {observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }          
        }
      },
      error: err => {
        this.subject.next("Error: Failed updating ticket.");
      }
    });
  }

  public delete(id: string): void {
    this.http.delete(`${environment.apiUrl}/ticket/delete?id=${id}`, {observe: 'response', responseType: 'text'}).subscribe({
      next: res => {
        if(res.status == 200) {
          if(res.body){
            this.subject.next(res.body.toString());
          }          
        }
      },
      error: err => {
        this.subject.next("Error: Failed deleting ticket.");
      }
    });
  }
  
  updateTable(): Observable<any>{ 
    return this.subject.asObservable();
  }
}