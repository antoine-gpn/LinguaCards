import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleLeft,
  faCircleRight,
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  baseUrl = 'http://localhost:8080/auth';
  loginFailed: boolean = false;

  left = faCircleLeft;
  right = faCircleRight;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    const params = new HttpParams()
      .set('username', this.loginForm.value.username || '')
      .set('password', this.loginForm.value.password || '');

    this.http
      .post(`${this.baseUrl}/login`, null, { params })
      .subscribe((user) => {
        if (user) {
          this.authService.setLoggedIn(user);
          sessionStorage.setItem('lang', 'en');
          this.router.navigate(['']);
        } else {
          this.loginFailed = true;
        }
      });
  }

  async register() {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    const res = await this.http
      .post(`${this.baseUrl}/register`, {
        username: username,
        password: password,
      })
      .subscribe((user) => {
        this.authService.setLoggedIn(user);
        sessionStorage.setItem('lang', 'en');
        this.router.navigate(['']);
      });
  }
}
