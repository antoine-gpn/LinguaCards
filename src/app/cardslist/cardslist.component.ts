import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cardslist',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cardslist.component.html',
  styleUrl: './cardslist.component.scss',
})
export class CardslistComponent implements OnInit {
  constructor(private cardService: CardService) {}

  cards!: any[];

  async ngOnInit() {
    const cards = await this.cardService.getAllCards();
    this.cards = cards;
  }
}
