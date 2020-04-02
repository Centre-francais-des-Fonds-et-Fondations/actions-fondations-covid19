import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulaireBesoinSoutienComponent } from './components/formulaire-besoin-soutien/formulaire-besoin-soutien.component';
import { FormulaireContactComponent } from './components/formulaire-contact/formulaire-contact.component';
import { HomepageComponent } from './components/homepage/homepage.component';


const routes: Routes = [
  { path: 'formulaireBesoinSoutien', component: FormulaireBesoinSoutienComponent },
  { path: 'formulaireContact', component: FormulaireContactComponent },
  { path: '', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
