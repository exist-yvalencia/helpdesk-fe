import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    model: any = {};
    loginForm!: FormGroup;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) { 
        const token = sessionStorage.getItem('token');
        if(token){
            this.router.navigateByUrl('/home');
        } else {
            this.router.navigateByUrl('/')
        }
    }

    ngOnInit() {
        sessionStorage.setItem('token', '');
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        
        if(this.loginForm.invalid) {
            return;
        }

        this.error = '';
        const token = btoa(`${this.f.username.value}:${this.f.password.value}`);
        const headers = new HttpHeaders ({
            Authorization: 'Basic ' + token
        })
        return this.http.get(`${environment.apiUrl}/account/login`, {headers, observe: 'response', responseType: 'text'})
        .subscribe({
            next: res => {
                if(res.status == 200) {
                    if(res.body) {
                        sessionStorage.setItem('role', res.body);
                    }
                    sessionStorage.setItem('username',this.f.username.value);
                    sessionStorage.setItem('token', token);
                    this.router.navigateByUrl('/home');
                }
            },
            error: err => {
                this.error = "Authentication failed.";
                this.f.password.reset();
            }
        })
    }
}
