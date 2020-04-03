import { Component, OnInit } from '@angular/core';
import { getInitiatives, getInitiativesByPages, pageReader } from '../../../airtable';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {

  listeInitiatives = {};
  pagination;

  constructor() { }

  ngOnInit(): void {
    getInitiativesByPages(12)
    .then((listResults) => {
      console.log('listResults');
      console.log(listResults);
      this.listeInitiatives = listResults[0];
      this.pagination = pageReader(listResults);
    }).catch();
  }

}
