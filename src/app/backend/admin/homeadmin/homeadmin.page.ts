import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.page.html',
  styleUrls: ['./homeadmin.page.scss'],
})
export class HomeadminPage implements OnInit {
  articulos: Articulo[] = [];


  constructor(public menuCtrl: MenuController, 
    public firestoreService: FirestoreService, 
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
    this.traerTodosLosArticulos();
  }

  //mostrar menu
  openMenu(){
    this.menuCtrl.toggle("menu1");
  }
  // mostrar articulos
  traerTodosLosArticulos(){
    this.firestoreService.obtenerLaColeccionXD<Articulo>('Articulos/').subscribe(rest => {
      this.articulos = rest;
    });
  }

  //eliminar articulos
  eliminarProducto(articulo: Articulo){
    const path = 'Articulos/';
    this.firestoreService.eliminarArticulo(path, articulo.id);
  }

  //actualizar articulos
  actualizarArticulo(articulo: Articulo) {
    this.firestoreService.changeArticulo(articulo);
    this.router.navigate(['/articulos']);
  }

  // confirmar eliminación de un artículo
  async confirmarEliminarProducto(articulo: Articulo) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro muchacho O_o?',
      message: '¿Flaco stá segurisimo de que deseas eliminar este artículo O_o?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.eliminarProducto(articulo);
          }
        }
      ]
    });
    await alert.present();
  }

  // confirmar eliminación de un artículo
  async confirmaractualizarProducto(articulo: Articulo) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro muchacho O_o?',
      message: '¿Flaco stá segurisimo de que deseas editar este artículo, esta perfecto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Editar',
          handler: () => {
            this.actualizarArticulo(articulo);
          }
        }
      ]
    });
    await alert.present();
  }

}
