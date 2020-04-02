import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vignette',
  templateUrl: './vignette.component.html',
  styleUrls: ['./vignette.component.scss']
})
export class VignetteComponent implements OnInit {

  nomStructure = '1% for the planet France';
  typeInitiative = 'Soutien';
  descriptionAction = 'Notre fondation oeuvre essentiellement dans les TESTS';
  descriptionInitiative = `Carte de présentation d'une proposition de soutien`;
  descriptionSoutienNature = `Cette demande ne s'accompagne pas de soutien offert en nature`;
  montant = '1500€';
  lienPage = 'https://www.google.fr';
  urlImg = 'https://www.centre-francais-fondations.org/logo.png';

  constructor() { }

  ngOnInit(): void {
  }

}
