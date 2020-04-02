import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-initiatives',
  templateUrl: './liste-initiatives.component.html',
  styleUrls: ['./liste-initiatives.component.scss']
})
export class ListeInitiativesComponent implements OnInit {

  listeInitiatives = [
    {
      type: 'Soutien',
      nomStructure: '1% for the planet France',
      descriptionAction: 'Notre fondation oeuvre essentiellement dans les TESTS',
      descriptionInitiative: `Carte de présentation d'une proposition de soutien`,
      descriptionSoutienNature: `Cette demande ne s'accompagne pas de soutien offert en nature`,
      montant: '1500€',
      lienPage: 'https://www.google.fr',
      urlImg: 'https://www.centre-francais-fondations.org/logo.png'
    },
    {
      type: 'Besoin',
      nomStructure: 'Pourquoi pas',
      descriptionAction: 'Notre fondation oeuvre essentiellement dans les TESTS Notre fondation oeuvre essentiellement dans les TESTS Notre fondation oeuvre essentiellement dans les TESTS',
      descriptionInitiative: `Carte de présentation d'une proposition de soutien`,
      descriptionSoutienNature: `Cette demande ne s'accompagne pas de soutien offert en nature`,
      lienPage: 'https://www.google.fr',
      urlImg: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/LOGO_Fondation_du_patrimoine.jpg'
    },
    {
      type: 'Soutien',
      nomStructure: 'Banque de France',
      descriptionAction: 'Notre fondation oeuvre essentiellement dans les TESTS',
      descriptionInitiative: `Carte de présentation d'une proposition de soutien`,
      descriptionSoutienNature: `Cette demande ne s'accompagne pas de soutien offert en nature`,
      montant: '27000€',
      lienPage: 'https://www.google.fr',
      urlImg: 'https://www.captifs.fr/wp-content/uploads/2019/04/Logo-Fondation-Orange-953x536.jpg'
    }
  ];

  nomStructure = '1% for the planet France';
  typeInitiative = 'Soutien';
  descriptionAction = 'Notre fondation oeuvre essentiellement dans les TESTS';
  descriptionInitiative = `Carte de présentation d'une proposition de soutien`;
  descriptionSoutienNature = `Cette demande ne s'accompagne pas de soutien offert en nature`;
  montant = '1500000€';
  lienPage = 'https://www.google.fr';
  urlImg = 'https://www.centre-francais-fondations.org/logo.png';

  constructor() { }

  ngOnInit(): void {
  }

}
