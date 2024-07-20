import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.page.html',
  styleUrls: ['./homeadmin.page.scss'],
})
export class HomeadminPage implements OnInit {
  articulos: Articulo[] = [];


  constructor(public menuCtrl: MenuController, public firestoreService: FirestoreService, private router: Router) { }

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



}
