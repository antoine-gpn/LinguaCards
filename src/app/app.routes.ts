import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RessourcepageComponent } from './ressourcepage/ressourcepage.component';
import { SettingsComponent } from './settings/settings.component';
import { GameComponent } from './game/game.component';
import { RessourceComponent } from './ressource/ressource.component';
import { NewCardComponent } from './new-card/new-card.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'ressources',
    component: RessourcepageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'learn', component: GameComponent, canActivate: [AuthGuard] },
  {
    path: 'ressources/:id',
    component: RessourceComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add', component: NewCardComponent, canActivate: [AuthGuard] },
  { path: 'add/:id', component: NewCardComponent, canActivate: [AuthGuard] },
];
