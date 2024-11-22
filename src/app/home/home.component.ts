import { Component, OnInit } from '@angular/core';
import { CardslistComponent } from '../cardslist/cardslist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardService } from '../services/card.service';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardslistComponent, FontAwesomeModule, RouterLink, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private cardService: CardService) {}
  backgroundStyle: any = {};

  faPlus = faPlus;

  cardsStats!: { [key: string]: number };

  async ngOnInit() {
    const cards = await this.cardService.getCardsStats();
    this.cardsStats = cards;

    let imageUrl: string;
    let lang = sessionStorage.getItem('lang');
    console.log(lang);

    switch (lang) {
      case 'fr':
        imageUrl = '/french-bg.svg';
        break;
      case 'en':
        imageUrl = '/uk-bg.png';
        break;
      default:
        imageUrl = '/uk-bg.png';
        break;
    }

    this.backgroundStyle = {
      background: `linear-gradient(
      rgba(115, 119, 119, 0.4),
      rgba(115, 119, 119, 0.4)
    ), url("${imageUrl}")`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
    };
  }
}
