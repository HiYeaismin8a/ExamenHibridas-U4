import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ClientesService } from './../services/clientes.service';
import { Reservacion } from 'src/app/interfaces/Reservacion';
import { ReservacionService } from './../services/reservacion.service';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.page.html',
  styleUrls: ['./reservacion.page.scss'],
})
export class ReservacionPage implements OnInit {
  reservaciones: Reservacion[] = [];

  reservacion: Reservacion = {
    costoTotal: 1000,
    fecha: new Date().toISOString(),
    nombreCliente: '',
    telefonoCliente: '',
    alberca: 0,
    brincolin: false,
    futbolito: false,
    mesaPostres: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private reservacionService: ReservacionService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['telefono']) {
        this.clientesService.getCliente(params['telefono']).then((doc) => {
          const cliente = doc.docs[0].data();
          this.reservacion.nombreCliente = cliente.nombre;
          this.reservacion.telefonoCliente = cliente.telefono;
        });
      }
    });

    this.reservacionService
      .getDatos()
      .snapshotChanges()
      .subscribe((datos) => {
        if (datos.length == 0) {
          return;
        } else {
          this.reservaciones = [];
          datos.forEach((doc) =>
            this.reservaciones.push(doc.payload.doc.data())
          );
        }
      });
  }

  calcular() {
    this.reservacion.costoTotal = 1000;
    if (this.reservacion.alberca) {
      this.reservacion.costoTotal += this.reservacion.alberca * 100;
    }

    if (this.reservacion.brincolin) {
      this.reservacion.costoTotal += 200;
    }

    if (this.reservacion.futbolito) {
      this.reservacion.costoTotal += 100;
    }

    if (this.reservacion.mesaPostres) {
      this.reservacion.costoTotal += 150;
    }
  }

  reservar() {
    if (
      this.reservaciones.filter((reservacion) =>
        reservacion.fecha.startsWith(this.reservacion.fecha.substring(0, 10))
      ).length > 0
    ) {
      console.log('fecha ocupada');
    } else {
      this.reservacionService
        .insertarDato(this.reservacion)
        .then(() => {
          console.log('registrado');
        })
        .catch((e) => console.log(e));
    }
  }
}
