import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleLeft,
  faCircleRight,
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  baseUrl = 'http://localhost:8080/auth';
  loginFailed: boolean = false;

  left = faCircleLeft;
  right = faCircleRight;

  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async login() {
    const username = this.loginForm.value.username || '';
    const password = this.loginForm.value.password || '';

    const res = await this.authService.login(username, password);
    if (res) {
      this.loginFailed = true;
    } else {
      this.router.navigate(['']);
    }
  }
}
