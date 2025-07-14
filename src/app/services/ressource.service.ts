import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RessourceService {
  //private baseUrl = 'http://localhost:8080/';
  private baseUrl = 'https://linguacards-back.onrender.com';

  constructor(private authService: AuthService) {}

  async getAllCardsByPack(id: number) {
    const response = await fetch(`${this.baseUrl}ressources/${id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const datas = await response.json();
    return datas;
  }
}
