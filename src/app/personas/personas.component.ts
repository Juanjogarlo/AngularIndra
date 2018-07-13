import { Component, OnInit } from '@angular/core';
import { PersonasViewModelService } from './personas.service';
import { ActivatedRouteSnapshot, Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  constructor(private vm: PersonasViewModelService) { }

  public get VM() { return this.vm; }

  ngOnInit() {
    this.vm.list();
  }
}
@Component({
  selector: 'app-personas-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasListComponent implements OnInit {

  // necesitamos inyectar el viewmodel para acceder a todo lo que hemos hecho
  constructor( private vm: PersonasViewModelService) { }

  // preparado para hacer mantenimiento y tal
  public get VM() { return this.vm; }

  ngOnInit() {
    // se añade aquí desde que se pone el routerlink, ya que se busca desde
    // la clase personaslistComponent
    this.vm.list();
  }

}
@Component({
  selector: 'app-personas-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasAddComponent implements OnInit {

  // necesitamos inyectar el viewmodel para acceder a todo lo que hemos hecho
  constructor( private vm: PersonasViewModelService) { }

  // preparado para hacer mantenimiento y tal
  public get VM() { return this.vm; }

  ngOnInit() {
    // se añade aquí desde que se pone el routerlink, ya que se busca desde
    // la clase personasAddComponent
    this.vm.list();
  }

}

@Component({
  selector: 'app-personas-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasEditComponent implements OnInit {

  // necesitamos inyectar el viewmodel para acceder a todo lo que hemos hecho
  constructor( private vm: PersonasViewModelService,
  // para activar las rutas
               private router: Router, private route: ActivatedRoute) { }

  // preparado para hacer mantenimiento y tal
  public get VM() { return this.vm; }

  // copiado del documento pagina 143
  private obs$: any;
  ngOnInit() {
  this.obs$ = this.route.paramMap.subscribe(
    (params: ParamMap ) => {
        const id = +params['id']; // (+) convertsstring'id' to a number
        if (id) {
          this.vm.view (id);
        } else {
        this.router.navigate(['/404.hrml']);
        }
      });
  }
  ngOnDestroy() { this.obs$.unsubscribe(); }

}

@Component({
  selector: 'app-personas-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasViewComponent implements OnInit {

  // necesitamos inyectar el viewmodel para acceder a todo lo que hemos hecho
  constructor( private vm: PersonasViewModelService) { }

  // preparado para hacer mantenimiento y tal
  public get VM() { return this.vm; }

  ngOnInit() {
  }

}


// como son muchos componentes, los vamos a publicar como un string
export const PERSONAS_COMPONENT = [PersonasComponent,
                                   PersonasAddComponent,
                                   PersonasEditComponent,
                                   PersonasListComponent,
                                   PersonasViewComponent];
