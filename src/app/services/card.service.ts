import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CardService {
  private baseUrl = 'http://localhost:8080/cards';
  http = inject(HttpClient);

  constructor(private authService: AuthService) {}

  async getAllCards() {
    const user = this.authService.getLoggedUser();
    const response = await fetch(`${this.baseUrl}/user/${user}`);
    const datas = await response.json();
    return datas;
  }

  async getCardById(id: string) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const datas = await response.json();
    return datas;
  }

  async getAllLearningCards() {
    const user = this.authService.getLoggedUser();
    const response = await fetch(`${this.baseUrl}/${user}/learning`);
    const datas = await response.json();
    return datas;
  }

  async getCardsStats() {
    const user = this.authService.getLoggedUser();
    const response = await fetch(`${this.baseUrl}/stats/${user}`);
    const datas = await response.json();
    return datas;
  }

  /*async deleteCard(id: string) {
    const response = await fetch(`${this.baseUrl}/delete/${id}`);
    const datas = await response.json();
    return datas;
  }*/

  /*async addCard(
    frontText: null | string | undefined,
    backText: null | string | undefined
  ) {
    const newCard = {
      id: 28,
      user_id: 1,
      front_text: frontText,
      back_text: backText,
      score: 0,
    };

    return this.http.post(`http://localhost:8080/cards/add`, {
      id: 28,
      user_id: 1,
      front_text: frontText,
      back_text: backText,
      score: 0,
    });
  }*/
}
