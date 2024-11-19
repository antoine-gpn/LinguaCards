import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showHeader = this.router.url !== '/login';

      this.showFooter =
        this.router.url !== '/login' && this.router.url !== '/learn';
    });
  }
}
