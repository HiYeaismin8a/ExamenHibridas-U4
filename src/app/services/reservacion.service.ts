import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';
import { Reservacion } from '../interfaces/Reservacion';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReservacionService {
  coleccionReservacion: AngularFirestoreCollection<Reservacion>;

  constructor(private afs: AngularFirestore) {
    this.coleccionReservacion = afs.collection<Reservacion>('Reservacion');
  }

  getDatos() {
    return this.coleccionReservacion;
  }

  getReservacion(id: string){
    return this.coleccionReservacion.doc(id).get()
  }

  insertarDato(reservacion: Reservacion){
    return this.coleccionReservacion.add(reservacion);
  }
  actualizar(reservacion: Reservacion){
    return this.coleccionReservacion.doc(reservacion.telefonoCliente).update(reservacion);
  }

}
