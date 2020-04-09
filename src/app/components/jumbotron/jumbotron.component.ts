import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gotoSearch(element: HTMLElement) {
    window.scrollTo({
      top: element.offsetTop - 54,
      behavior: 'smooth'
    });
  }
}
