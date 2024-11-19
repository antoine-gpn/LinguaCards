import { Component, OnInit } from '@angular/core';
import { CardslistComponent } from '../cardslist/cardslist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardService } from '../services/card.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardslistComponent, FontAwesomeModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private cardService: CardService) {}

  faPlus = faPlus;

  cardsStats!: { [key: string]: number };

  async ngOnInit() {
    const cards = await this.cardService.getCardsStats();
    this.cardsStats = cards;
    console.log(this.cardsStats);
  }
}
