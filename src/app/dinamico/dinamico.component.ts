import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DemosComponent } from '../demos/demos.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { PersonasComponent } from '../personas/personas.component';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css'],
  entryComponents: [HomeComponent, DemosComponent, CalculadoraComponent, PersonasComponent],
  // para indiciar que van a usarse, ya que la plantilla no lo sabe
})
export class DinamicoComponent implements OnInit {

  menu = [
    { texto: 'Personas', componente: PersonasComponent },
    { texto: 'Inicio', componente: HomeComponent },
    { texto: 'Demos', componente: DemosComponent},
    { texto: 'Calculadora', componente: CalculadoraComponent}
  ];

  // se selecciona una por defecto, en este caso el primero
  seleccionado = this.menu[0].componente;

  constructor() { }

  ngOnInit() {
  }

  // para seleccionar una pantalla u otra
  seleccionar(indice: number ) {
    this.seleccionado = this.menu[indice].componente;
  }
}
