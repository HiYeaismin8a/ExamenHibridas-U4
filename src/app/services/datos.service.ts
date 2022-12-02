import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Dato } from './../interfaces/dato';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  coleccion: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.coleccion = afs.collection<Dato>('Datos');
  }

  getDatos() {
    return this.coleccion;
  }

  getDato(id: string){
    return this.coleccion.doc(id);
  }

  insertarDato(dato: Dato){
    return this.coleccion.add(dato);
  }

  eliminar(id: string){
    return this.coleccion.doc(id).delete();
  }

  actualizar(dato: Dato){
    return this.coleccion.doc(dato.id).update(dato);
  }
}
