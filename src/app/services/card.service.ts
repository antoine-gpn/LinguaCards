import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CardService implements OnInit {
  private baseUrl = 'http://localhost:8080/cards';
  private headers!: {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.headers = {
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    };
  }

  async getAllCards() {
    const user = this.authService.getUserId();
    const response = await fetch(`${this.baseUrl}/user/${user}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const datas = await response.json();
    return datas;
  }

  async getCardById(id: string) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const datas = await response.json();
    return datas;
  }

  async getAllLearningCards() {
    const user = this.authService.getUserId();
    const response = await fetch(`${this.baseUrl}/${user}/learning`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const datas = await response.json();
    return datas;
  }

  async getCardsStats() {
    const user = this.authService.getUserId();
    const response = await fetch(`${this.baseUrl}/stats/${user}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    const datas = await response.json();
    return datas;
  }

  async addCard(
    frontText: string,
    backText: string,
    userId: string,
    image: string
  ) {
    const response = await fetch(`http://localhost:8080/cards/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        front_text: frontText,
        back_text: backText,
        score: 0,
        image: image,
      }),
    });
    return response;
  }

  async getImage(prompt: string) {
    const body =
      '{"prompt":"' +
      prompt +
      '","negative_prompt":"b&w, ugly","guidance_scale":2,"seed":42,"num_images":1,"image":{"size":"square_1_1"},"styling":{"style":"vector", "framing":"portrait"}}';

    const response = await fetch('/api/v1/ai/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-freepik-api-key': 'FPSX48f78b1a02984559842180cd007cc4ae',
      },
      body: body,
    });

    return await response.json();
  }

  /*async deleteCard(id: string) {
    const response = await fetch(`${this.baseUrl}/delete/${id}`);
    const datas = await response.json();
    return datas;
  }*/
}
