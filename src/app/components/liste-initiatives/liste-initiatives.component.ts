import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import { getInitiatives, getInitiativesByPages, PageReader } from '../../../airtable';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {

  PAGE_SIZE = 21;
  callState = 'await';
  pageReader: any;

  query = '';
  queryType = '';
  queryZone = '';
  queryArea = '';
  queryRegion = '';

  types = ['Besoin', 'Soutien'];
  areas = [
    'Recherche',
    'Education',
    'Hôpitaux',
    'Emploi',
    'Action internationale',
    'Solidarité',
    'Médico-social',
    'Santé',
    'Autre'
  ];
  zones = [
    'Internationale',
    'Nationale',
    'Régionale'
  ];
  regions = [
    'Grand Est',
    'Nouvelle-Aquitaine',
    'Auvergne-Rhône-Alpes',
    'Bourgogne-Franche-Comté',
    'Bretagne',
    'Centre-Val de Loire',
    'Corse',
    'Hauts-de-France',
    'Île-de-France',
    'Occitanie',
    'Normandie',
    'Pays de la Loire',
    'Provence-Alpes-Côte d\'Azur',
    'Guadeloupe',
    'Guyane',
    'Martinique',
    'Réunion',
    'Mayotte'
  ];

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
  onSelectRegion(event: any) {
    this.queryRegion = event.target.value.toLowerCase();
    this.search();
  }
  search() {
    const match = (from: string, q: string): any => {
      if (q.length > 0) {
        return from.toLowerCase().match(new RegExp(`${q}.*`));
      }
      return true;
    };
    this.pageReader.setIndex(0);
    this.pageReader.search(
      (record) => {
        // si rien, tout afficher
        if (this.query.length === 0
          && this.queryType.length === 0
          && this.queryArea.length === 0
          && this.queryZone.length === 0
          && this.queryRegion.length === 0) {
          return true;
        }
        console.log(record.region);
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
        if (this.queryRegion.length > 0) {
          valid = valid && record.region && record.region.some(field => field.toLowerCase() === this.queryRegion);
        }
        return valid;
      }
    );
  }
  gotoSearch() {
    const element = document.getElementById('initiatives');
    window.scrollTo({
      top: element.offsetTop - 54,
      behavior: 'smooth'
    });
  }
}
