import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return (
      sessionStorage.getItem('token') !== null &&
      sessionStorage.getItem('token') !== ''
    );
  }

  setLoggedIn(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getUserId() {
    const token: string = sessionStorage.getItem('token') || '';
    const decoded: { [key: string]: any } = jwtDecode(token);
    return decoded['userId'];
  }

  getUsername() {
    const token: string = sessionStorage.getItem('token') || '';
    const decoded: { [key: string]: any } = jwtDecode(token);
    return decoded['sub'];
  }

  async register(username: string, password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (username !== '' && password !== '' && regex.test(password)) {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        console.error(`Registration failed: ${response.statusText}`);
        return false;
      }

      const token = await response.text();
      sessionStorage.setItem('token', token);

      await fetch(
        `http://localhost:8080/cards/addBeginCards/${this.getUserId()}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return true;
    } else {
      return false;
    }
  }

  async login(username: string, password: string) {
    const response = await fetch(
      `${this.baseUrl}/login?username=${username}&password=${password}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return true;
    }

    const token = await response.text();

    if (token) {
      sessionStorage.setItem('lang', 'en');
      this.setLoggedIn(token);
      return false;
    } else {
      return true;
    }
  }
}
