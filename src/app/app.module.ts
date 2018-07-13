import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// para el formsModule
import { FormsModule } from '@angular/forms';

// para la conexión de http
import { HttpClientModule } from '@angular/common/http';

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
import { environment } from '../environments/environment';
import { PersonasViewModelService, PersonasDAOViewModelService } from './personas/personas.service';

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
    ComunesModule,
    HttpClientModule

  ],
  // este servicio es un ejemplo de un servicio que solo se quiere instanciar una vez
  providers: [LoggerService,
    {provide: ERROR_LEVEL, useValue: environment.errorLevel},
    // para usar el personasDAOViewModelService en lugar de personasService
    {provide: PersonasViewModelService, useClass: PersonasDAOViewModelService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
