import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {

  liste = [
    {name: 'Diego' , age: 30},
    {name: 'Diego' , age: 27},
    {name: 'Diego' , age: 31},
    {name: 'Diego' , age: 17},
    {name: 'Diego' , age: 23},
    {name: 'Diego' , age: 30},
    {name: 'Diego' , age: 26},
    {name: 'Diego' , age: 30},
    {name: 'Diego' , age: 67},
    {name: 'Diego' , age: 30},
    {name: 'Diego' , age: 34},
    {name: 'Diego' , age: 28}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
