import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Cliente } from './../interfaces/cliente';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  coleccion: AngularFirestoreCollection<Cliente>;
  constructor(private afs: AngularFirestore) {
    this.coleccion = afs.collection<Cliente>('clientes');
  }

  getCliente(telefono: string) {
    return this.coleccion.ref.where('telefono', '==', telefono).get();
  }
}
