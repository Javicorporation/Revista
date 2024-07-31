import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Articulo } from 'src/app/modelsDatabase';

@Component({
  selector: 'app-modal-articulo',
  templateUrl: './modal-articulo.component.html',
  styleUrls: ['./modal-articulo.component.scss'],
})
export class ModalArticuloComponent  implements OnInit {
  @Input() articulo: Articulo;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

}
