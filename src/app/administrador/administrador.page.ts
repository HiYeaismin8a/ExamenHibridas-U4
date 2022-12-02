import { Component, OnInit } from '@angular/core';

import { Reservacion } from '../interfaces/Reservacion';
import { ReservacionService } from './../services/reservacion.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  reservaciones: Reservacion[] = [];
  filtrar = false;
  constructor(private reservacionService: ReservacionService) {}

  ngOnInit() {
    this.getReservaciones();
  }

  getReservaciones() {
    this.reservacionService
      .getDatos()
      .get()
      .subscribe((datos) => {
        this.reservaciones = [];
        if (!this.filtrar) {
          datos.forEach((doc) => this.reservaciones.push(doc.data()));
        } else {
          const hoy = new Date(
            new Date().toISOString().substring(0, 10)
          ).getTime();
          datos.forEach((doc) => {
            const reservacion = doc.data();
            const diaReservacion = new Date(
              reservacion.fecha.substring(0, 10)
            ).getTime();
            if (diaReservacion >= hoy && diaReservacion <= hoy + 172800000) {
              this.reservaciones.push(reservacion);
            }
          });
        }
      });
  }
}
