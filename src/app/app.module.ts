import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VignetteComponent } from './components/vignette/vignette.component';
import { NavComponent } from './share/nav/nav.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ListeInitiativesComponent } from './components/liste-initiatives/liste-initiatives.component';

// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatToolbarModule } from '@angular/material/toolbar';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { FooterComponent } from './share/footer/footer.component';
import { FooterWrapperComponent } from './share/footer/footer-wrapper/footer-wrapper.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium, faFacebook, faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavComponent,
    VignetteComponent,
    ListeInitiativesComponent,
    JumbotronComponent,
    FooterComponent,
    FooterWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, farSquare
        , farCheckSquare, faStackOverflow, faGithub, faMedium,
        faFacebook, faTwitter, faLinkedin, faYoutube);
  }
}
