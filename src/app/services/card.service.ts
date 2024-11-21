import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CardService {
  private baseUrl = 'http://localhost:8080/cards';
  http = inject(HttpClient);

  //constructor(private http: HttpClient) {}

  async getAllCards() {
    const response = await fetch(`${this.baseUrl}`);
    const datas = await response.json();
    return datas;
  }

  async getAllLearningCards() {
    const response = await fetch(`${this.baseUrl}/1/learning`);
    const datas = await response.json();
    return datas;
  }

  async getCardsStats() {
    const response = await fetch(`${this.baseUrl}/stats`);
    const datas = await response.json();
    return datas;
  }

  async addCard(
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
  }
}
