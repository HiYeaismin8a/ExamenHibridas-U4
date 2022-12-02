import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { RangeValue } from '@ionic/core';
import { Reservacion } from '../interfaces/Reservacion';
import { ReservacionService } from '../services/reservacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public reservaciones: Reservacion[];

  public more: boolean = false;
  public lastEmittedValue: RangeValue;
  public value: any;

  constructor(
    private reservacionService: ReservacionService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.reservacionService
      .getDatos()
      .snapshotChanges()
      .subscribe((res) => {
        console.log(res);
      });

  }

  public cerrarSesion() {
    this.router.navigate(['/login']);
  }

  public showMore() {
    this.more = !this.more;
    if (this.more) {
      this.alert();
    }
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar el huésped?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  niveau(ev: Event) {
    //this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
  }
}
