import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.scss',
})
export class NewCardComponent {
  constructor(private router: Router) {}

  form = new FormGroup({
    frontText: new FormControl(''),
    backText: new FormControl(''),
  });

  sumbmitForm() {
    console.log(this.form.value.frontText);
    console.log(this.form.value.backText);
    this.router.navigate(['']);
  }
}
