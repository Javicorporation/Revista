import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tecnologia',
  templateUrl: './tecnologia.page.html',
  styleUrls: ['./tecnologia.page.scss'],
})
export class TecnologiaPage implements OnInit {
  articulos: Articulo[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.firestoreService.obtenerArticulosPorCategoria('tecnologia').subscribe(articulos => {
      this.articulos = articulos;
    });
  }

}
