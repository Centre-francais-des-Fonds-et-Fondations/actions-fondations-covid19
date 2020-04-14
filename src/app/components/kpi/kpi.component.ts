import { Component, OnInit } from '@angular/core';
import { getKPIs } from '../../../airtable';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss'],
})
export class KpiComponent implements OnInit {

  soutien: any;
  besoin: any;
  constructor() { }

  async ngOnInit() {
    const data = await getKPIs();
    this.soutien = data.soutien;
    this.besoin = data.besoin;
  }

}
