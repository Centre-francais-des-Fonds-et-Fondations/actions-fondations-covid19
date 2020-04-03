import { Component, OnInit } from '@angular/core';
import { getInitiatives } from '../../../airtable';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {

  listeInitiatives = {};

  constructor() { }

  ngOnInit(): void {
    getInitiatives()
    .then((listResults) => {
      console.log('listResults');
      console.log(listResults);
      this.listeInitiatives = listResults;
    }).catch();
  }

}
