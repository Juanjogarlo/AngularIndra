import { Injectable, Optional } from '@angular/core';
import { LoggerService } from '../../my-core';

@Injectable({
  // con esta línea se registra a nivel de módulo
  providedIn: 'root'
})
export class NotificationService {

  private listado: Array<string> = [];

  // inyectamos el servicio que acabamos de crear
  // con optional, si tiene el logger se lo pasa, si no, no
  constructor(@Optional() private out: LoggerService) { }

  // como con el get se devuelve el listado, aunque esté en private, van a poder hacer push y
  // demás sobre el objeto listado
  /*public get Listado () {
    return this.listado;
  }*/
  // para solucionarlo se devuelve una copia del listado
  // es menos eficiente pero es la única forma de que no puedan tocar el listado original
  public get Listado () {
    return Object.assign([], this.listado);
  }


 public add(msg: string) {
   this.listado.push(msg);
   if (this.out) {
     this.out.error(msg);
   }
 }

 public remove (index: number) {
   if (0 <= index && index < this.listado.length) {
     // posicion inicial y cuántos se deben borrar
      this.listado.splice(index, 1);
   } else {
     this.out.error('Indice fuera de rango.');
   }
 }

 public clear () {
   // si solo se pone posición incial, se lleva todos los demás por delante
   this.listado.splice(0);
 }
}
