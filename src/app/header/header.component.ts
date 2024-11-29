import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  langs: { [key: string]: string }[] = [
    { text: 'French', value: 'fr' },
    { text: 'English', value: 'en' },
  ];

  ngOnInit(): void {
    const lang = sessionStorage.getItem('lang');
    this.langs.sort((a, b) => {
      if (a['value'] === lang) {
        return -1;
      } else if (b['value'] === lang) {
        return 1;
      }
      return 0;
    });
  }

  changeLanguage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const lang = select.value;
    sessionStorage.setItem('lang', lang);
    window.location.reload();
  }
}
