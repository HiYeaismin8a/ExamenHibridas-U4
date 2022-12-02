import { Component } from '@angular/core';
import { ReservacionService } from '../services/reservacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private datosService: ReservacionService) {}
}
