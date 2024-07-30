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
  // creacion de un arreglo de articulos vacio - esta es la que se va a iterar y se presentara en el home admin
  articulos: Articulo[] = [];


  // en el constructor se implementan variables  como para control de menu, alertas, servicios etc
  constructor(public menuCtrl2: MenuController, 
    public firestoreService: FirestoreService, 
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
    this.traerTodosLosArticulos();
  }

  // metodo que muestra el menu "menu1" esta implementado en app.component.html
  openMenu2(){
    this.menuCtrl2.close('menuHomeAdmin'); // Cierra todos los menús antes de abrir el nuevo
    this.menuCtrl2.toggle('menuHomeAdmin');
  }

  // metodo que muestra todo los articulos
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
    //redirige a la pestaña articulo y se rellena con los datos del articulo elegido
    this.router.navigate(['/articulos']);
  }

  // confirmar eliminación de un artículo
  async confirmarEliminarProducto(articulo: Articulo) {
    // creacion de una variable constante alert
    const alert = await this.alertController.create({
      header: '¿Estás seguro muchacho O_o?',
      message: '¿Flaco stá segurisimo de que deseas eliminar este artículo O_o?',
      buttons: [
        {
          text: 'Cancelar',  // texto del boton cancelar
          role: 'cancel',
          cssClass: 'secondary', // color
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar', // texto del boton eliminar
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
          text: 'Cancelar',  // texto del boton cancelar
          role: 'cancel',
          cssClass: 'secondary', // color
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Editar',  // texto del boton editar
          // cuando se presiona el icomo se accederia a la funcion actualizar articulo 
          handler: () => {
            this.actualizarArticulo(articulo);
          }
        }
      ]
    });
    await alert.present();
  }

}
