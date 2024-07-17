import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  articulos: Articulo[] = [];

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

  constructor(public menuCtrl: MenuController
    , public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.traerTodosLosarticulos();
    this.firestoreService.currentArticulo.subscribe(articulo => {
      if (articulo) {
        this.newArticulo = articulo;
      }
    });
  }

  openMenu(){
    this.menuCtrl.toggle("menu1");
  }

  guardarArticulo(){
  const path = 'Articulos/';
    this.firestoreService.crearArticulo(this.newArticulo, this.path, this.newArticulo.id);
  }

  traerTodosLosarticulos(){
    this.firestoreService.obtenerLaColeccionXD<Articulo>(this.path).subscribe(rest =>{
      this.articulos = rest;
    })
  }

  eliminarArticulo(articulo: Articulo){
    this.firestoreService.eliminarArticulo(this.path, articulo.id);
  }
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
