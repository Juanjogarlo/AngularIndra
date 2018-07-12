import { Pipe, PipeTransform} from '@angular/core';
@Pipe({
name: 'elipsis'
})
export class ElipsisPipe implements PipeTransform {
  transform(value: any, maxlen: number): any {
return (!maxlen || !value || value.length < maxlen
  || value.length < 4) ? value : (value.substr(0, maxlen - 3) + '...');
  }
}

// para hacer muchos export de golpe y no tener que hacerlos uno a uno
// se puede declarar un array
export const PIPES_CADENAS = [ElipsisPipe];


