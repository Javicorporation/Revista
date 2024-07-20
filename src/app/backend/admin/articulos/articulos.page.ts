import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  //lista de articulos
  articulos: Articulo[] = [];

  // articulos vacios
  newArticulo: Articulo = {
    tituloDeArticulo: '',
    categoria: '',
    resumenDelArticulo: '',
    fechaPublicacion: new Date,
    autor: '',
    informacion: '',
    foto: '',
    id: this.firestoreService.getId()
  };

  private path= 'Articulos/'

  // implementaciones en el controlador
  constructor(public menuCtrl: MenuController, public firestoreService: FirestoreService,private alertController: AlertController ) { }

  ngOnInit() {
    // Implementación de los artículos en el adminhome por medio de la suscripción a firestore
    this.firestoreService.currentArticulo.subscribe(articulo => {
      if (articulo) {
        this.newArticulo = articulo;
      }
    });
  }

  //mostrar menu
  openMenu(){
    this.menuCtrl.toggle("menu1");
  }

  //Método guardar artículo, con la validación de ingreso de datos
  async guardarArticulo() {
    if (!this.newArticulo.tituloDeArticulo || !this.newArticulo.categoria || !this.newArticulo.resumenDelArticulo || !this.newArticulo.fechaPublicacion || !this.newArticulo.autor ||!this.newArticulo.informacion){
        const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const path = 'Articulos/';
      this.firestoreService.crearArticulo(this.newArticulo, this.path, this.newArticulo.id);
    }
  }

  /*
  traerTodosLosarticulos(){
    this.firestoreService.obtenerLaColeccionXD<Articulo>(this.path).subscribe(rest =>{
      this.articulos = rest;
    })
  }

  eliminarArticulo(articulo: Articulo){
    this.firestoreService.eliminarArticulo(this.path, articulo.id);
  }
  */

  // metodo limpiar campos
  limpiarCampos() {
    this.newArticulo = {
      tituloDeArticulo: '',
      categoria: '',
      resumenDelArticulo: '',
      fechaPublicacion: new Date(),
      autor: '',
      informacion: '',
      foto: '',
      id: this.firestoreService.getId()
    };
  }

}
