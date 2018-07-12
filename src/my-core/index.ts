// fichero pasarela para usar otros imports
// va a exportar lo que hay dentro de my-core
// así si se reorganiza la carpeta, los que lo estén importando
// no se ven afectados
// también sirve para que no sepan desde fuera la estructura interna de la aplicación

export {MyCoreModule} from './my-core.module';
export {LoggerService, ERROR_LEVEL} from './services/logger.service';

// para usar el pipe como código fuera, se debe poner como export
export { ElipsisPipe } from './pipes/cadenas.pipe';
/* por ejemplo esto, si se quiere poder usar esta transformación mediante código
var k = new ElipsisPipe();
var u = k.transform('xxx', 10);
*/
