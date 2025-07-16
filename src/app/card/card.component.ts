import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faXmark,
  faPenToSquare,
  faRotate,
  faClockRotateLeft
} from '@fortawesome/free-solid-svg-icons';
import { CardService } from '../services/card.service';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule, NgClass, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: { [key: string]: any };
  menuVisible: boolean = false;
  isDeleted = false;

  faXmark = faXmark;
  faPenToSquare = faPenToSquare;
  faRotate = faRotate;
  faClockRotateLeft = faClockRotateLeft

  constructor(
    private cardService: CardService,
    private http: HttpClient,
    private router: Router
  ) {}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  async resetCard(id: string) {
    const res = await this.http
      .put(`http://localhost:8080/cards/updateScore/${id}`, { score: 0 })
      .subscribe((res) => {
        console.log(res);
      });
  }

  async deleteCard(id: string) {
    const res = await this.http
      .delete(`http://localhost:8080/cards/delete/${id}`)
      .subscribe((res) => {
        this.isDeleted = true;
      });
  }

  updateCard(id: string) {
    this.router.navigateByUrl(`add/${id}`);
  }

  isImageCorrupted(image: string): boolean {
    return image.length < 50;
  }
}
