import { Component, OnInit } from '@angular/core';
import { getInitiatives, getInitiativesByPages, pageReader } from '../../../airtable';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {

  results;
  pageActions;
  listeInitiatives;

  constructor() { }

  ngOnInit(): void {
    getInitiativesByPages(12)
    .then((listResults: Array<Array<any>>) => {
      console.log('listResults');
      console.log(listResults);
      this.results = listResults;
      this.listeInitiatives = listResults[0];
      this.pageActions = pageReader(listResults);
    }).catch();
  }

  next(){
    this.listeInitiatives = this.pageActions.next();
  }
  prev(){
    this.listeInitiatives = this.pageActions.prev();
  }
  setPageIndex(i: number) {
    this.pageActions.setIndex(i);
    this.listeInitiatives = this.pageActions.get();
  }


}
