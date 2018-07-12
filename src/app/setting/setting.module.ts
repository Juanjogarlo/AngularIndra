import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// no lo cargamos directemente en appModule, porque se quiere cargar cuando se vaya a usar
// llevará seguramente el tema de las rutas

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class SettingModule { }
