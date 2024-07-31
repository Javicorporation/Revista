import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ciencia',
  templateUrl: './ciencia.page.html',
  styleUrls: ['./ciencia.page.scss'],
})
export class CienciaPage implements OnInit {
  articulos: Articulo[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.firestoreService.obtenerArticulosPorCategoria('ciencias').subscribe(articulos => {
      this.articulos = articulos;
    });
  }

}
