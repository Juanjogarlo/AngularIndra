// recomendable que esté en un fichero a parte en lugar de estar en
// app.module, para evitar que choquen con otros desarrollos y tal
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DemosComponent } from './demos/demos.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { PersonasListComponent, PersonasViewComponent, PersonasEditComponent, PersonasAddComponent } from './personas/personas.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent},
  { path: 'demos', component: DemosComponent},
  { path: 'chisme/de/hacer/numeros', component: CalculadoraComponent},
  { path: 'personas', component: PersonasListComponent},
  { path: 'personas/add', component: PersonasAddComponent},
  { path: 'personas/:id', component: PersonasViewComponent},
  { path: 'personas/:id/edit', component: PersonasEditComponent},
  { path: 'pepito/grillo', redirectTo: '/personas/2'},
  // la ventaja de los hijos es que no te equivocas con las rutas
  // y por ejemplo se pueden dar permisos a todos los hijos a la vez
  // desde el padre (p.e. canActivateChildrejn)
  { path: 'clientes', children : [
    { path: '', component: PersonasListComponent},
    { path: 'add', component: PersonasAddComponent},
    { path: ':id', component: PersonasViewComponent},
    { path: ':id/edit', component: PersonasEditComponent}]
  },
  { path: '404.html', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},
  ];




