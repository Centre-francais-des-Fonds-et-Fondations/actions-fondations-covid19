import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vignette',
  templateUrl: './vignette.component.html',
  styleUrls: ['./vignette.component.scss']
})
export class VignetteComponent implements OnInit {

  @Input() initiative: any;

  constructor() { }

  ngOnInit(): void {
  }

  // normalisation des urls car on ne connait a aucune securité sur le fait que les lien entrés soient bien formatés
  normalizeUrl(url: string) {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      return `https://${url}`;
    }
    return url;
  }
}
