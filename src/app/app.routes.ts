import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RessourcepageComponent } from './ressourcepage/ressourcepage.component';
import { SettingsComponent } from './settings/settings.component';
import { GameComponent } from './game/game.component';
import { RessourceComponent } from './ressource/ressource.component';
import { NewCardComponent } from './new-card/new-card.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ressources', component: RessourcepageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'learn', component: GameComponent },
  { path: 'ressources/:id', component: RessourceComponent },
  { path: 'add', component: NewCardComponent },
];
