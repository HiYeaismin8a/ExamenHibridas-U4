import { Component, OnInit } from '@angular/core';

import { Reservacion } from '../interfaces/Reservacion';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {
  reservaciones: Reservacion[] =[]
  constructor() { }

  ngOnInit() {
  }

}
