import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.scss',
})
export class NewCardComponent {
  constructor(
    private router: Router,
    private cardService: CardService,
    private http: HttpClient
  ) {}

  form = new FormGroup({
    frontText: new FormControl(''),
    backText: new FormControl(''),
  });

  async sumbmitForm() {
    const frontText = this.form.value.frontText;
    const backText = this.form.value.backText;

    const res = await this.http
      .post(`http://localhost:8080/cards/add`, {
        user_id: 1,
        front_text: frontText,
        back_text: backText,
        score: 0,
      })
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['']);
      });
  }
}
