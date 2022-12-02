import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { ClientesService } from './../services/clientes.service';
import { Reservacion } from '../interfaces/Reservacion';
import { ReservacionService } from '../services/reservacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  telefono = '';
  reservaciones: Reservacion[] = [];
  public myForm: FormGroup;
  public validationMessages: Object;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private clientesService: ClientesService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.myForm = this.formBuilder.group({
      token: ['', Validators.compose([Validators.required])],
    });

    this.validationMessages = {
      token: [
        {
          type: 'required',
          message: 'Campo requerido para continuar',
        },
      ],
    };
  }

  async login() {
    //this.authService.validarToken(this.myForm.get('token').value);
    this.clientesService
      .getCliente(this.myForm.get('token').value)
      .then((query) => {
        if (query.docs.length == 0) {
          console.log('Telefono no registrado');
        } else {
          this.router.navigate(['/', 'reservacion', this.myForm.get('token').value]);
        }
      });
  }
}
