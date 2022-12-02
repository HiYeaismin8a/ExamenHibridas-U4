import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';
import { Reservacion } from '../interfaces/Reservacion';

@Injectable({
  providedIn: 'root',
})
export class ReservacionService {
  coleccionReservacion: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.coleccionReservacion = afs.collection<Reservacion>('Reservacion');
  }

  getDatos() {
    return this.coleccionReservacion;
  }

  getReservacion(telefono: string){
    return this.coleccionReservacion.ref.where('telefono', '==', telefono).get();
  }

  insertarDato(reservacion: Reservacion){
    return this.coleccionReservacion.add(reservacion);
  }
  actualizar(reservacion: Reservacion){
    return this.coleccionReservacion.doc(reservacion.telefonoCliente).update(reservacion);
  }
}
