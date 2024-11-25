import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleLeft,
  faCircleRight,
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  baseUrl = 'http://localhost:8080/auth';
  loginFailed: boolean = false;

  left = faCircleLeft;
  right = faCircleRight;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}


  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async register() {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password ?? '';
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(username !== "" && password !== "" && regex.test(password)){
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
    }else{
      this.loginFailed = true;
    }
  }
}
