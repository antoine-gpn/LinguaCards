import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { HttpClient } from '@angular/common/http';

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
  failedAdd : boolean = false;

  async ngOnInit() {
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
  }

  async sumbmitForm() {
    const frontText = this.form.value.frontText;
    const backText = this.form.value.backText;

    if(frontText !== "" && backText !== ""){
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
  }else{
    this.failedAdd = true;
  }
}
  
}
