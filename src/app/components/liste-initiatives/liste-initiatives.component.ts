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
  PAGE_SIZE = 12;

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

  search() {
    this.pageReader.setIndex(0);
    this.pageReader.search(
      (record) => {
        // si rien, tout afficher
        if (this.query.length === 0 && this.queryType.length === 0) {
          return true;
        }
        // sinon ...
        let valid = true;
        if (this.query.length > 0) {
          valid = record.structureName.toLowerCase().match(new RegExp(`${this.query}.*`));
        }
        if (this.queryType.length > 0) {
          valid = valid && record.initiativeType.toLowerCase().match(new RegExp(`${this.queryType}.*`));
        }
        return valid;
      }
    );
  }
}
