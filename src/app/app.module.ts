import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { faStackOverflow, faGithub, faMedium, faFacebook, faTwitter, faLinkedin, faYoutube, faFirefox, faEdge, faChrome } from '@fortawesome/free-brands-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare as farSquare, faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VignetteComponent } from './components/vignette/vignette.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ListeInitiativesComponent } from './components/liste-initiatives/liste-initiatives.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { CtaComponent } from './components/cta/cta.component';
import { NavComponent } from './share/nav/nav.component';
import { FooterComponent } from './share/footer/footer.component';
import { FooterWrapperComponent } from './share/footer/footer-wrapper/footer-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavComponent,
    VignetteComponent,
    ListeInitiativesComponent,
    JumbotronComponent,
    FooterComponent,
    FooterWrapperComponent,
    CtaComponent
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
    registerLocaleData(localeFr);
    library.addIcons(faSquare, faCheckSquare, farSquare
      , farCheckSquare, faStackOverflow, faGithub, faMedium,
      faFacebook, faTwitter, faLinkedin, faYoutube, faFirefox, faEdge, faChrome);
  }
}
