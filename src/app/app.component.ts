import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

// para el selector de idioma
import localeEs from '@angular/common/locales/extra/es';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private notify: NotificationService) {
    this.notify.add('Esto es una demo');
    this.notify.remove(6);
  }
}
