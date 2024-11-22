import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  checkLoginStatus(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/status`);
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
  }

  /*login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }*/

  isLoggedIn(): boolean {
    return (
      sessionStorage.getItem('user') !== null &&
      sessionStorage.getItem('user') !== 'undefined'
    );
  }

  setLoggedIn(user: { [key: string]: any }): void {
    sessionStorage.setItem('user', user['id']);
  }

  getLoggedUser() {
    return sessionStorage.getItem('user');
  }
}
