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

  cards!: { [key: string]: any }[];

  async ngOnInit() {
    const pack_id = this.route.snapshot.params['id'];
    this.cards = await this.ressourceService.getAllCardsByPack(pack_id);
    console.log(this.cards);
  }
}
