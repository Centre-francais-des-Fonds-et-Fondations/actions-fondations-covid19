import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CtaComponent } from './components/cta/cta.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cta', component: CtaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
