import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ressourcepage',
  standalone: true,
  imports: [NgStyle, RouterLink],
  templateUrl: './ressourcepage.component.html',
  styleUrl: './ressourcepage.component.scss',
})
export class RessourcepageComponent implements OnInit {
  ressources!: { [key: string]: any }[];

  ngOnInit(): void {
    this.ressources = [
      { id: 1, url: 'verbs.png' },
      { id: 2, url: 'adjectives.png' },
      { id: 3, url: 'food.png' },
      { id: 4, url: 'sports.png' },
      { id: 5, url: 'body.png' },
      { id: 6, url: 'weather.png' },
      { id: 7, url: 'clothes.png' },
      { id: 8, url: 'animals.png' },
      { id: 9, url: 'travel.png' },
      { id: 10, url: 'mood.png' },
      { id: 11, url: 'house.png' },
      { id: 12, url: 'work.png' },
    ];
  }
}
