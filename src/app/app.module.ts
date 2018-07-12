import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// para el formsModule
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// import del componente creado (si se usa el asistente, se importa solo al añadir el nombre en imports de abajo)
import { MyCoreModule, LoggerService, ERROR_LEVEL } from '../my-core';
import { ComunesModule } from './comunes/comunes.module';
import { HomeComponent } from './home/home.component';
import { DemosComponent } from './demos/demos.component';
import { NotificationComponent } from './notification/notification.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { DinamicoComponent } from './dinamico/dinamico.component';
import { PERSONAS_COMPONENT } from './personas/personas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemosComponent,
    NotificationComponent,
    CalculadoraComponent,
    DinamicoComponent,
    PERSONAS_COMPONENT,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MyCoreModule,
    ComunesModule
  ],
  // este servicio es un ejemplo de un servicio que solo se quiere instanciar una vez
  providers: [LoggerService,
    {provide: ERROR_LEVEL, useValue: 3},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
