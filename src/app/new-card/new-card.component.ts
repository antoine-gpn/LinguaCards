import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-new-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.scss',
})
export class NewCardComponent implements OnInit {
  constructor(
    private router: Router,
    private cardService: CardService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  card!: { [key: string]: any };
  form!: FormGroup;
  failedAdd: boolean = false;
  image!: string;
  user_id: string = '';

  async ngOnInit() {
    this.form = new FormGroup({
      frontText: new FormControl(''),
      backText: new FormControl(''),
    });

    this.user_id = sessionStorage.getItem('user') || '';

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

    if (this.card) {
      console.log('update');
      if (frontText !== '' && backText !== '') {
        const res = await this.http
          .put(`http://localhost:8080/cards/update/${this.card['id']}`, {
            user_id: this.user_id,
            front_text: frontText,
            back_text: backText,
            image: this.image,
            score: 0,
          })
          .subscribe((res) => {
            console.log(res);
            this.router.navigate(['']);
          });
      } else {
        this.failedAdd = true;
      }
    } else {
      console.log('add');
      if (frontText !== '' && backText !== '') {
        const res = await this.http
          .post(`http://localhost:8080/cards/add`, {
            user_id: this.user_id,
            front_text: frontText,
            back_text: backText,
            image: this.image,
            score: 0,
          })
          .subscribe((res) => {
            console.log(res);
            this.router.navigate(['']);
          });
      } else {
        this.failedAdd = true;
      }
    }
  }
}
