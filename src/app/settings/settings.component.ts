import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  faGlobe = faGlobe;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  user!: { [key: string]: any };

  logout() {
    this.authService.setLoggedIn({});
    this.router.navigate(['']);
  }

  deleteAccount() {
    fetch(`http://localhost:8080/auth/delete/${this.user['id']}`, {
      method: 'DELETE',
    });
    this.authService.setLoggedIn({});
    this.router.navigate(['']);
  }

  async ngOnInit() {
    const user_id = sessionStorage.getItem('user');
    fetch(`http://localhost:8080/auth/user/${user_id}`)
      .then((response) => response.json())
      .then((data) => (this.user = data));
  }
}
