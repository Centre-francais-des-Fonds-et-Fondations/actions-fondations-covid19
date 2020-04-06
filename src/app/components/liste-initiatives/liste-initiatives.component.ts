import { Component, OnInit } from '@angular/core';
import { getInitiatives, getInitiativesByPages, PageReader } from '../../../airtable';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {

  pageReader;
  isLoading = true;

  async ngOnInit() {
    const data = await getInitiativesByPages(6);
    this.pageReader = PageReader(data);
    this.isLoading = false;
  }

  onChange(event: any) {
    const query = event.target.value.toLowerCase();
    // query: string
    this.pageReader.search(
      (record) => {
        // si rien, tout afficher
        if (query.length === 0) {
          return true;
        }
        let critere: string;
        // il est possible qu'il n'y ai pas de nom de structure => VOIR LE AIRTABLE
        if (record.structureName) {
          critere = record.structureName;
        }
        else {
          critere = record.id;
        }
        return critere.toLowerCase().match(new RegExp(`${query}.*`));
      }
    );
    this.pageReader.setIndex(0);
  }

}
