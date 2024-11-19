import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CardService {
  private baseUrl = 'http://localhost:8080/';

  async getAllCards() {
    const response = await fetch(`${this.baseUrl}cards`);
    const datas = await response.json();
    return datas;
  }

  async getAllLearningCards() {
    const response = await fetch(`${this.baseUrl}cards/1/learning`);
    const datas = await response.json();
    return datas;
  }

  async getCardsStats() {
    const response = await fetch(`${this.baseUrl}cards/stats`);
    const datas = await response.json();
    return datas;
  }
}
