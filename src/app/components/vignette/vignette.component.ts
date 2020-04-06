import { Component, OnInit, Input } from '@angular/core';
import normalizeUrl from 'normalize-url';

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

  getHttpLink(link: string) {
    return normalizeUrl(link);
  }
}
