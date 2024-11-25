import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardfullComponent } from '../cardfull/cardfull.component';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faReply,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { CardService } from '../services/card.service';
import { Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterLink, NgClass, FontAwesomeModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  constructor(private cardService: CardService, private http: HttpClient) {}

  cards!: { [key: string]: any }[];
  currentCard!: { [key: string]: any };
  finished: boolean = false;

  back = faReply;
  left = faArrowLeft;
  right = faArrowRight;

  isFlipped: boolean = false;
  startX: number = 0;
  currentX: number = 0;
  isDragging: boolean = false;
  isTransitioning: boolean = false;
  isBackTextHidden: boolean = true;
  isFrontTextHidden: boolean = false;

  async ngOnInit() {
    this.cards = await this.cardService.getAllLearningCards();
    this.currentCard = this.cards[0];
  }

  flip() {
    if (!this.isFlipped && !this.finished) {
      this.isFlipped = true;

      this.isBackTextHidden = true;

      setTimeout(() => {
        this.isBackTextHidden = false;
      }, 300);
    }
  }

  flipOnNewCard() {
    this.isFlipped = false;

    this.isFrontTextHidden = true;

    setTimeout(() => {
      this.isFrontTextHidden = false;
    }, 300);
  }

  onDragStart(event: MouseEvent | TouchEvent): void {
    if (this.isTransitioning || !this.isFlipped) return;
    this.isDragging = true;
    this.startX = this.getClientX(event);
  }

  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging || this.isTransitioning || !this.isFlipped) return;
    this.currentX = this.getClientX(event);
    const moveX = -(this.currentX - this.startX);

    const frontCard = document.querySelector('.front-card') as HTMLElement;
    if (frontCard) {
      frontCard.style.transform = `translateX(${moveX}px)`;
    }
  }

  onDragEnd(): void {
    if (!this.isDragging || this.isTransitioning || !this.isFlipped) return;
    this.isDragging = false;

    const threshold = 100;
    const moveX = -(this.currentX - this.startX);

    const frontCard = document.querySelector('.front-card') as HTMLElement;
    if (frontCard) {
      if (Math.abs(moveX) > threshold) {
        this.isTransitioning = true;

        frontCard.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        frontCard.style.transform = `translateX(${moveX > 0 ? 1000 : -1000}px)`;
        frontCard.style.opacity = '0';

        const flippedSide = moveX < 0 ? 'right' : 'left';

        setTimeout(() => {
          this.flipOnNewCard();
          this.updateScore(flippedSide);
          this.replaceCard();
          frontCard.style.transition = 'none';

          frontCard.style.transform = 'translateX(0)';
          frontCard.style.opacity = '1';

          this.isTransitioning = false;
        }, 300);
      } else {
        frontCard.style.transition = 'transform 0.3s ease';
        frontCard.style.transform = 'translateX(0)';
      }
    }

    this.currentX = 0;
    this.startX = 0;
  }

  replaceCard(): void {
    this.cards.shift();

    if (this.cards.length > 0) {
      this.currentCard = this.cards[0];
    } else {
      this.currentCard = {};
      this.finished = true;
    }
  }

  getClientX(event: MouseEvent | TouchEvent): number {
    if (event instanceof MouseEvent) {
      return event.clientX;
    } else {
      return event.touches[0].clientX;
    }
  }

  async updateScore(flippedSide: string) {
    const id = this.currentCard['id'];
    let newScore = this.currentCard['score'];

    if (flippedSide === 'left' && newScore !== 0) {
      newScore -= 2;
    } else if (flippedSide === 'right') {
      newScore += 2;
    }

    const res = await this.http
      .put(`http://localhost:8080/cards/updateScore/${id}`, {
        score: newScore,
      })
      .subscribe((res) => {});
  }
}
