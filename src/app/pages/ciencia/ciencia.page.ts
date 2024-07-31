import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalArticuloComponent } from 'src/app/componentes/modal-articulo/modal-articulo.component';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ciencia',
  templateUrl: './ciencia.page.html',
  styleUrls: ['./ciencia.page.scss'],
})
export class CienciaPage implements OnInit {
  articulos: Articulo[] = [];

  constructor(private firestoreService: FirestoreService, private modalController: ModalController) { }

  ngOnInit() {
    this.firestoreService.obtenerArticulosPorCategoria('ciencias').subscribe(articulos => {
      this.articulos = articulos;
    });
  }

  async openModal(articulo: Articulo) {
    const modal = await this.modalController.create({
      component: ModalArticuloComponent,
      componentProps: {
        articulo: articulo
      }
    });
    return await modal.present();
  }

}
