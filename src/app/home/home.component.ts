import { Component, OnInit } from '@angular/core';
import { CardslistComponent } from '../cardslist/cardslist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardService } from '../services/card.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardslistComponent,
    FontAwesomeModule,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  backgroundStyle: any = {};

  faPlus = faPlus;

  lang: string = sessionStorage.getItem('lang') || '';

  cardsStats!: { [key: string]: number };

  card!: { [key: string]: any };
  form!: FormGroup;
  failedAdd: boolean = false;
  image!: string;
  user_id: string = '';

  async ngOnInit() {
    this.user_id = this.authService.getUserId() || '';

    this.form = new FormGroup({
      frontText: new FormControl(''),
      backText: new FormControl(''),
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.cardService.getCardById(id).then((response) => {
        this.card = response;
      });

      this.form.patchValue({
        frontText: this.card['front_text'],
        backText: this.card['back_text'],
      });
    }

    const cards = await this.cardService.getCardsStats();
    this.cardsStats = cards;
  }

  async getImage() {
    const prompt = this.form.value.frontText;
    this.cardService.getImage(prompt).then((data) => {
      this.image = data['data'][0]['base64'];
    });
  }

  async sumbmitForm() {
    const frontText = this.form.value.frontText;
    const backText = this.form.value.backText;

    if (frontText !== '' && backText !== '') {
      const response = await this.cardService.addCard(
        frontText,
        backText,
        this.user_id,
        this.image
      );

      if (response.ok) {
        window.location.reload();
      } else {
        this.failedAdd = true;
      }
    } else {
      this.failedAdd = true;
    }
  }
}
