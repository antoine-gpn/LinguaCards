import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cardslist',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cardslist.component.html',
  styleUrl: './cardslist.component.scss',
})
export class CardslistComponent {
  cards: any[] = [
    { id: 1, front_text: 'welcoming', back_text: 'accueillant' },
    { id: 2, front_text: 'annoyed', back_text: 'agacé' },
    { id: 3, front_text: 'kind', back_text: 'aimable' },
    { id: 4, front_text: 'friendly', back_text: 'amical' },
    { id: 5, front_text: 'attentive', back_text: 'attentif' },
    { id: 6, front_text: 'beautiful', back_text: 'beau' },
    { id: 7, front_text: 'noisy', back_text: 'bruyant' },
    { id: 8, front_text: 'broken', back_text: 'cassé' },
    { id: 9, front_text: 'lucky', back_text: 'chanceux' },
    { id: 10, front_text: 'colored', back_text: 'coloré' },
    { id: 10, front_text: 'trusting', back_text: 'confiant' },
    { id: 12, front_text: 'user-friendly', back_text: 'convivial' },
    { id: 13, front_text: 'guilty', back_text: 'coupable' },
    { id: 14, front_text: 'curious', back_text: 'curieux' },
    { id: 15, front_text: 'disgusting', back_text: 'dégoûtant' },
  ];
}
