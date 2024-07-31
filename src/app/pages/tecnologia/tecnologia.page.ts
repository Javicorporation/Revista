import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalArticuloComponent } from 'src/app/componentes/modal-articulo/modal-articulo.component';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tecnologia',
  templateUrl: './tecnologia.page.html',
  styleUrls: ['./tecnologia.page.scss'],
})
export class TecnologiaPage implements OnInit {
  articulos: Articulo[] = [];

  constructor(private firestoreService: FirestoreService, private modalController: ModalController) { }

  ngOnInit() {
    this.firestoreService.obtenerArticulosPorCategoria('tecnologia').subscribe(articulos => {
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
