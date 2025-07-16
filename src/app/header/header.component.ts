import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  langs: { [key: string]: string }[] = [
    { icon: 'france.png', value: 'fr' },
    { icon: 'united-kingdom.png', value: 'en' },
    { icon: 'spain.png', value: 'es' },
    { icon: 'germany.png', value: 'ge' },
    { icon: 'italy.png', value: 'it' },
  ];
  currentLang: string|null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const queryParams = this.route.snapshot.queryParamMap;
        const lang = queryParams.get('lang');

        if (lang && ['fr', 'en', 'es', 'ge'].includes(lang)) {
          this.currentLang = lang;
        } else {
          this.currentLang = 'fr';
        }
        console.log(this.currentLang)
      });
  
    //const lang = sessionStorage.getItem('lang');
  }

  changeLang(newLang: string) {
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { lang: newLang },
    queryParamsHandling: 'merge', 
    replaceUrl: true              
  });
}


}
