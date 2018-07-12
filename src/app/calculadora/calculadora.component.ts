import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  cache: number;
  resultado: number;
  pantalla: number;
  pantalla2: number;
  operando: string;
  salida: string;

  constructor() {
   }

  ngOnInit() {
    this.resultado = 0;
    this.pantalla = 0;
    this.operando = 'nada';
    this.salida = '0';
  }

  public ponPantalla(a: number) {
    if (this.operando === 'nada') {
      this.pantalla = a;
      this.pantalla2 = 0;
      this.resultado = 0;
      this.salida = this.pantalla.toString();
    } else {
      this.pantalla2 = a;
      this.salida = this.salida + ' ' + a.toString();
    }
  }

  public opera(operacion: string) {

    if (this.pantalla2 === 0) {
      this.operando = operacion;
      this.salida = this.salida.toString() + ' ' + this.operando;
    } else {
      // si tiene un operando, realizamos antes la operacion
      if (this.operando === '+') {
        this.resultado = this.pantalla + this.pantalla2;
        this.salida = this.resultado.toString() + ' ' + operacion;
      }
      if (this.operando === '-') {
        this.resultado = this.pantalla - this.pantalla2;
        this.salida = this.resultado.toString() + ' ' + operacion;
      }
      if (this.operando === '*') {
        this.resultado = this.pantalla * this.pantalla2;
        this.salida = this.resultado.toString() + ' ' + operacion;
      }
      if (this.operando === '/') {
        this.resultado = this.pantalla / this.pantalla2;
        this.salida = this.resultado.toString() + ' ' + operacion;
      }
      this.pantalla2 = 0;
      this.operando = operacion;
      this.pantalla = this.resultado;
    }

  }
  public suma(a: number) {
    // this.cache = this.resultado;
    // si no tiene ningun operando se añade el operando a la pantalla
    if (this.operando === 'nada') {
      this.operando = '+';
      this.salida = this.salida + ' +';
    } else {
      // si tiene operando, se suma el valor que tenía más el que viene
      this.resultado = this.pantalla + this.pantalla2;
      this.pantalla = this.resultado;
      this.pantalla2 = 0;
      this.operando = '+';
      this.salida = this.resultado.toString() + this.operando;
    }
  }
  public resta(a: number) {
  // this.cache = this.resultado;
    // si no tiene ningun operando se añade el operando a la pantalla
    if (this.operando === 'nada') {
      this.operando = '-';
      this.salida = this.salida + ' -';
      // this.pantalla = a.toString() + this.operando;
    } else {
      // si tiene operando, se suma el valor que tenía más el que viene
      this.resultado = this.pantalla - this.pantalla2;
      this.pantalla = this.resultado;
      this.pantalla2 = 0;
      this.operando = '-';
      this.salida = this.resultado.toString() + this.operando;
    }

  }
  public divide(a: number) {
  // this.cache = this.resultado;
    // si no tiene ningun operando se añade el operando a la pantalla
    if (this.operando === 'nada') {
      this.operando = '/';
      this.salida = this.salida + ' /';
      // this.pantalla = a.toString() + this.operando;
    } else {
      // si tiene operando, se suma el valor que tenía más el que viene
      this.resultado = this.pantalla / this.pantalla2;
      this.pantalla = this.resultado;
      this.pantalla2 = 0;
      this.operando = '/';
      this.salida = this.resultado.toString() + this.operando;
    }
  }
  public multiplica(a: number) {
  // this.cache = this.resultado;
    // si no tiene ningun operando se añade el operando a la pantalla
    if (this.operando === 'nada') {
      this.operando = '*';
      this.salida = this.salida + ' *';
      // this.pantalla = a.toString() + this.operando;
    } else {
      // si tiene operando, se suma el valor que tenía más el que viene
      this.resultado = this.pantalla * this.pantalla2;
      this.pantalla = this.resultado;
      this.pantalla2 = 0;
      this.operando = '*';
      this.salida = this.resultado.toString() + this.operando;
    }
  }
  public igual(a: number) {
    if (this.operando === '+') {
      this.resultado = this.pantalla + this.pantalla2;
    }
    if (this.operando === '-') {
      this.resultado = this.pantalla - this.pantalla2;
    }
    if (this.operando === '/') {
      this.resultado = this.pantalla / this.pantalla2;
    }
    if (this.operando === '*') {
      this.resultado = this.pantalla * this.pantalla2;
    }
    this.operando = 'nada';
    this.pantalla2 = 0;
    this.pantalla = this.resultado;
    this.salida = this.resultado.toString();
  }

}
