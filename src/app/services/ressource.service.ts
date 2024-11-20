import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RessourceService {
  private baseUrl = 'http://localhost:8080/';

  async getAllCardsByPack(id: number) {
    const response = await fetch(`${this.baseUrl}ressources/${id}`);
    const datas = await response.json();
    return datas;
  }
}
