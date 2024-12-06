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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  baseUrl = 'http://localhost:8080/auth';
  loginFailed: boolean = false;

  left = faCircleLeft;
  right = faCircleRight;

  constructor(private authService: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  async register() {
    const username = this.registerForm.value.username ?? '';
    const password = this.registerForm.value.password ?? '';

    const succeed = await this.authService.register(username, password);
    if (succeed) {
      this.router.navigate(['']);
    } else {
      this.loginFailed = true;
    }
  }
}
