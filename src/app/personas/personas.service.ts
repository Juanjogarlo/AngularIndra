import { Injectable } from '@angular/core';
import { LoggerService } from '../../my-core';
import { NotificationService } from '../services/notification.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// servicio para comunicacion restFull
@Injectable ({
  providedIn: 'root'
})
   export class PersonasDAOService {
     // protected porque luego esto se puede heredar
    protected  baseUrl = environment.urlWS + 'personas';
    protected options = {};
    // en app.module se ha importando el HttpClientModule
    // y luego aquí se importa el httpClient
    constructor(private http: HttpClient) { }
    query(): Observable <any> {
      return this.http.get(this.baseUrl, this.options);
    }
    get(id: any) {
      return this.http.get(this.baseUrl + '/' + id, this.options);
    }
    add(item: any) {
      return this.http.post(this.baseUrl, item, this.options);
    }
    change(item: any) {
      return this.http.put(this.baseUrl, item, this.options);
    }
    remove(id: number) {
      return this.http.delete(this.baseUrl + '/' + id, this.options);
    }
}



// servicio singleton
// ún unico servicio da servicio a todos los componentes

// este usará el DAO
@Injectable()
export class PersonasDAOViewModelService {

  // una cadena que solo va a aceptar los string que aquí están
  protected modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  // para no mantener una estructura de datos, así además se abstrae
  // de la capa de datos y la de presentación
  protected listado: Array<any> = [];
  // editar una persona. Any porque no hay modelo
  protected elemento: any = {};
  // fin parte del binding

  protected idOriginal: any = null;
  // contante del nombre de la propiedas que actua de PK
  protected pk = 'id';

  constructor( protected out: LoggerService,
               protected notify: NotificationService,
              protected dao: PersonasDAOService) { }

  // método público para concer el modo
  public get Modo() { return this.modo; }
  // método público para concer el Listado
  public get Listado() { return this.listado; }
  // método público para concer el Elemento
  public get Elemento() { return this.elemento; }

  // como no hay servidor, se va a utilizar para inicializar el listado
  // y tener datos para probar
  public list () {
    // CONSULTA A LA BBDD
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
      },
      err => this.notify.add(err.message)
    );
  }

  public add() {
    this.elemento = {};
    this.modo = 'add';
  }

  // o bien number o  bien string
  public edit (key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      err => this.notify.add(err.message)
    );
  }
  // o bien number o  bien string
  public view (key: number | string) {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.modo = 'view';
      },
      err => this.notify.add(err.message)
    );
  }

  // o bien number o  bien string
  public remove (key: any) {
    // lo suyo es hacer un servicio que use window, pero no da tiempo
    // si no acepta, se sale del método y punto
    if (!window.confirm('¿Seguro?')) { return; }

    this.dao.remove(key).subscribe(
      data => {
        this.list();
      },
      err => this.notify.add(err.message)
    );
  }

  public cancel () {
    this.elemento = {};
    this.idOriginal = null;
    this.list();
  }

  public send () {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'edit':
        this.dao.change(this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'view':
      // no se tendría por qué hacer, pero como los usuarios son así...
        this.cancel();
        break;
    }
  }
}

// este usa los datos almacenados en un fichero
@Injectable()
export class PersonasViewModelService {

  // una cadena que solo va a aceptar los string que aquí están
  protected modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  // para no mantener una estructura de datos, así además se abstrae
  // de la capa de datos y la de presentación
  protected listado: Array<any> = [];
  // editar una persona. Any porque no hay modelo
  protected elemento: any = {};
  // fin parte del binding

  protected idOriginal: any = null;
  // contante del nombre de la propiedas que actua de PK
  protected pk = 'id';

  constructor( protected out: LoggerService,
               protected notify: NotificationService) { }

  // método público para concer el modo
  public get Modo() { return this.modo; }
  // método público para concer el Listado
  public get Listado() { return this.listado; }
  // método público para concer el Elemento
  public get Elemento() { return this.elemento; }

  // como no hay servidor, se va a utilizar para inicializar el listado
  // y tener datos para probar
  public list () {
    // Por sistemas altamente concurrentes, se va a pregunar
    // si el listado está vacío
    if (this.listado.length === 0) {
      this.listado = [
        {id: 1, nombre: 'Juan', apellidos: 'Lopez', edad: 34},
        {id: 2, nombre: 'Maria', apellidos: 'Mora', edad: 12},
        {id: 3, nombre: 'Eva', apellidos: 'Larrosa', edad: 25},
        {id: 4, nombre: 'Manu', apellidos: 'Barrero', edad: 56},
      ];
    }
    // si pones otra cosa que no sea uno de los de arriba, da error
    this.modo = 'list';
  }

  public add() {
    this.elemento = {};
    this.modo = 'add';
  }

  // o bien number o  bien string
  public edit (key: number | string) {
    // item [this.pk] -> el campo que es el pk del item
    // == en lugar de ===, no se quiere que sea la identidad,
    // solo queremos que coincida el valor
    // (si pasan un number y es un string así sí que funcionaría)
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item [this.pk] == key);
    if (rslt) {
      // this.elemento = rslt; -> así asigna directamente y si se cancela
      // ya estaría el valor guardado y no se podría recuperar
      this.elemento = Object.assign({}, rslt);
      this.idOriginal = key;
      this.modo = 'edit';
    } else {
      this.notify.add ('Elemento no encontrado');
    }
  }
  // o bien number o  bien string
  public view (key: number | string) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item [this.pk] == key);
    if (rslt) {
      // es una vista y no se debe modificar el dato peeeeeeero
      // quizás el que hace la presentación intenta hacer una actualización
      // así se hace una copia por si acaso.
      this.elemento = Object.assign({}, rslt);
      this.modo = 'view';
    } else {
      this.notify.add ('Elemento no encontrado');
    }
  }
  // o bien number o  bien string
  public remove (key: number | string) {
    // lo suyo es hacer un servicio que use window, pero no da tiempo
    // si no acepta, se sale del método y punto

    if (!window.confirm('¿Seguro?')) { return; }
    // findIndex devuelve solo el índice del elemento
    // si no existe, devuelve '-1'
    // tslint:disable-next-line:triple-equals
    const index = this.listado.findIndex(item => item [this.pk] == key);
    if (index > -1) {
      this.listado.splice(index, 1);
      // despues de eliminarlo, se llamaría al servidor y se traerían
      // otra vez los datos
      this.list();
    } else {
      this.notify.add ('Elemento no encontrado');
    }
  }

  public cancel () {
    this.elemento = {};
    this.idOriginal = null;
    this.list();
  }

  public send () {
    switch (this.modo) {
      case 'add':
        // coger los nuevos datos que estaban en el elemento
        // y guardarlos en el listado (si fuera un server, guardarlos allí)
        this.listado.push(this.elemento);
        // una vez guardado, limpiamos todas las variables
        this.cancel();
        break;
      case 'edit':
        // hay que encontrar el elemento que se quiere editar
        // tslint:disable-next-line:triple-equals
        const index = this.listado.findIndex(item => item [this.pk] == this.idOriginal);
        if (index > -1) {
          this.listado[index] = this.elemento;
          this.cancel();
        } else {
          this.notify.add ('Elemento no encontrado');
        }
        break;
      case 'view':
      // no se tendría por qué hacer, pero como los usuarios son así...
        this.cancel();
        break;
    }
  }
}
