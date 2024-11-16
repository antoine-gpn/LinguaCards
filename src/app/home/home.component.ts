import { Component } from '@angular/core';
import { CardslistComponent } from '../cardslist/cardslist.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardslistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
