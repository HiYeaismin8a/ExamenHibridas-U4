import { Component, OnInit } from '@angular/core';

import { ReservacionService } from './../../services/reservacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  telefono = '';

  constructor(
    private reservacionService: ReservacionService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.reservacionService.getReservacion(this.telefono).then((query) => {
      if (query.docs.length == 0) {
        console.log('Telefono no registrado');
      } else {
        this.router.navigate(['/', 'reservacion'], {
          state: { id: query.docs[0].id },
        });
      }
    });
  }
}
