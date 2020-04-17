import { Component, OnInit, Input, ViewChild, ContentChild } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // todo: generaliser cette fonction
  gotoSearch() {
    const element = document.getElementById('initiatives');
    window.scrollTo({
      top: element.offsetTop - 54,
      behavior: 'smooth'
    });
  }
}
