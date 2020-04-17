import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller, Location } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'actions-fondations-covid19';
  location: Location;

  constructor(
    readonly router: Router,
    readonly viewportScroller: ViewportScroller
  ) {
    // pour le routelink -> cta
    // permet de forcer la vue en haut de page apres le routelink
    router.events
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          viewportScroller.scrollToPosition([0, 0]);
        }
      });

  }

  ngOnInit() {
    // en prod, toujours rediriger vers la version https si on est en http
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }
}
