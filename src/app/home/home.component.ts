import { Component, OnInit } from '@angular/core';
import { CardslistComponent } from '../cardslist/cardslist.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardService } from '../services/card.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
import { NewCardComponent } from '../new-card/new-card.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardslistComponent,
    FontAwesomeModule,
    RouterLink,
    NgStyle,
    NewCardComponent,
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
    private route: ActivatedRoute
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
    this.user_id = sessionStorage.getItem('user') || '';

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
    const body =
      '{"prompt":"' +
      prompt +
      '","negative_prompt":"b&w, ugly","guidance_scale":2,"seed":42,"num_images":1,"image":{"size":"square_1_1"},"styling":{"style":"vector"}}';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-freepik-api-key': 'FPSX48f78b1a02984559842180cd007cc4ae',
      },
      body: body,
    };

    await fetch('/api/v1/ai/text-to-image', options)
      .then((response) => response.json())
      .then((response) => (this.image = response['data'][0]['base64']))
      .catch((err) => console.error(err));
  }

  async sumbmitForm() {
    const frontText = this.form.value.frontText;
    const backText = this.form.value.backText;

    if (frontText !== '' && backText !== '') {
      const res = await this.http
        .post(`http://localhost:8080/cards/add`, {
          user_id: this.user_id,
          front_text: frontText,
          back_text: backText,
          score: 0,
          image: this.image,
        })
        .subscribe((res) => {
          console.log(res);
          window.location.reload();
        });
    } else {
      this.failedAdd = true;
    }
  }
}
