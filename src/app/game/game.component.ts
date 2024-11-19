import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardfullComponent } from '../cardfull/cardfull.component';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faL, faReply } from '@fortawesome/free-solid-svg-icons';
import { CardService } from '../services/card.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterLink, CardfullComponent, NgClass, FontAwesomeModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  constructor(private cardService: CardService, private renderer: Renderer2) {}

  cards!: { [key: string]: any }[];
  currentCard!: { [key: string]: any };

  isFlipped: boolean = false;
  startX: number = 0;
  currentX: number = 0;
  isDragging: boolean = false;
  isTransitioning: boolean = false;
  back = faReply;
  isBackTextHidden: boolean = true;
  isFrontTextHidden: boolean = false;

  async ngOnInit() {
    this.cards = await this.cardService.getAllLearningCards();
    this.currentCard = this.cards[0];
    console.log(this.cards);
  }

  flip() {
    this.isFlipped = true;

    this.isBackTextHidden = true;

    setTimeout(() => {
      this.isBackTextHidden = false;
    }, 300);
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

        setTimeout(() => {
          this.flipOnNewCard();
          this.replaceCard();
          frontCard.style.transition = 'none';
          e;
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
    }
  }

  getClientX(event: MouseEvent | TouchEvent): number {
    if (event instanceof MouseEvent) {
      return event.clientX;
    } else {
      return event.touches[0].clientX;
    }
  }
}
