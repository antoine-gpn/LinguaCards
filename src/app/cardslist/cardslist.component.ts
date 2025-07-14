import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cardslist',
  standalone: true,
  imports: [CardComponent, RouterLink],
  templateUrl: './cardslist.component.html',
  styleUrl: './cardslist.component.scss',
})
export class CardslistComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private authService: AuthService
  ) {}

  cards!: any[];
  searchSelect: string = 'All';
  searchInput: string = '';

  async ngOnInit() {
    const cards = await this.cardService.getAllCards();
    this.cards = cards;
  }

  updateSelect(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSelect = value;
    this.updateList();
  }

  updateInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchInput = value;
    this.updateList();
  }

  async updateList() {
    const response = await fetch(
      `http://localhost:8080/cards/cardsFilter/${this.authService.getUserId()}/${
        this.searchSelect
      }/${this.searchInput !== '' ? this.searchInput : 'null'}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const datas = await response.json();
    this.cards = datas;
  }
}
