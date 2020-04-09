import { Component, OnInit } from '@angular/core';
import { getInitiatives, getInitiativesByPages, PageReader } from '../../../airtable';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {
  pageReader: any;
  query = '';
  queryType = '';
  queryZone = '';
  queryArea = '';
  PAGE_SIZE = 12;

  types = ['Besoin', 'Soutien'];
  areas = [
    "Recherche",
    "Education",
    "Hôpitaux",
    "Emploi",
    "Action internationale",
    "Solidarité",
    "Médico-social",
    "Autre",
    "Santé"
  ];
  zones = [
    "Internationale",
    "Nationale",
    "Régionale"
  ];

  callState = 'await';
  async ngOnInit() {
    try {
      const data = await getInitiativesByPages(this.PAGE_SIZE);
      this.pageReader = PageReader(data);
      this.callState = 'ok';
    } catch (err) {
      this.callState = 'ko';
    }
  }

  onChange(event: any) {
    this.query = event.target.value.toLowerCase();
    this.search();
  }
  onSelectType(event: any) {
    this.queryType = event.target.value.toLowerCase();
    this.search();
  }
  onSelectArea(event: any) {
    this.queryArea = event.target.value.toLowerCase();
    this.search();
  }
  onSelectZone(event: any) {
    this.queryZone = event.target.value.toLowerCase();
    this.search();
  }

  search() {
    const match = (from, q) => {
      if (q.length > 0) {
        return from.toLowerCase().match(new RegExp(`${q}.*`));
      }
      return true;
    }
    this.pageReader.setIndex(0);
    this.pageReader.search(
      (record) => {
        // si rien, tout afficher
        if (this.query.length === 0 && this.queryType.length === 0 && this.queryArea.length === 0 && this.queryZone.length === 0) {
          return true;
        }
        // sinon ...
        let valid = true;
        valid = valid && match(record.structureName, this.query);
        valid = valid && match(record.initiativeType, this.queryType);
        if (this.queryArea.length > 0) {
          valid = valid && record.interventionAreas && record.interventionAreas.some(field => field.toLowerCase() === this.queryArea);
        }
        if (this.queryZone.length > 0) {
          valid = valid && record.interventionZone && record.interventionZone.some(field => field.toLowerCase() === this.queryZone);
        }
        return valid;
      }
    );
  }
}
