import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  baseUrl = 'http://localhost:8080/auth';
  loginFailed: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    const params = new HttpParams()
      .set('username', this.form.value.username || '')
      .set('password', this.form.value.password || '');

    const isAuthenticated = this.http
      .post<any>(`${this.baseUrl}/login`, null, { params })
      .subscribe((response) => {
        if (response.message === 'Login successful') {
          this.authService.setLoggedIn(true);
          this.router.navigate(['']);
        } else if (response.message === 'Invalid credentials') {
          this.loginFailed = true;
        }
      });
  }
}
