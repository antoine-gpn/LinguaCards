import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faXmark,
  faPenToSquare,
  faRotate,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: { [key: string]: any };

  faXmark = faXmark;
  faPenToSquare = faPenToSquare;
  faRotate = faRotate;
}
