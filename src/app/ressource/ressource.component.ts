import { Component, OnInit } from '@angular/core';
import { RessourceService } from '../services/ressource.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ressource',
  standalone: true,
  imports: [],
  templateUrl: './ressource.component.html',
  styleUrl: './ressource.component.scss',
})
export class RessourceComponent implements OnInit {
  constructor(
    private ressourceService: RessourceService,
    private route: ActivatedRoute
  ) {}

  ressources: { [key: string]: any }[] = [
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

  cards!: { [key: string]: any }[];
  url!: string;

  async ngOnInit() {
    const pack_id = this.route.snapshot.params['id'];
    this.cards = await this.ressourceService.getAllCardsByPack(pack_id);
    const currentPack = this.ressources.find((res) => res['id'] == pack_id);
    if (currentPack) {
      this.url = currentPack['url'];
    }
  }
}
