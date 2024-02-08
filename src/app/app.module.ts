import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuestionarioComponent } from './components/cuestionario/cuestionario.component';
import { HttpClientModule } from '@angular/common/http';
import { AccordionComponent } from './components/accordion/accordion.component';
import { AccordionContainerComponent } from './components/accordion-container/accordion-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CuestionarioComponent,
    AccordionComponent,
    AccordionContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
