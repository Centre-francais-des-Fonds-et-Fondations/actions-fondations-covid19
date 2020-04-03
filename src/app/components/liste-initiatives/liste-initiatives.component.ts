import { Component, OnInit } from '@angular/core';
import Airtable from '../../../airtable';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {

  listeInitiatives = {};

  constructor() { }

  ngOnInit(): void {
    Airtable.getInitiatives()
    .then((AAA) => {
      console.log('AAA');
      console.log(AAA);
      this.listeInitiatives = AAA;
    }).catch();
  }

}
