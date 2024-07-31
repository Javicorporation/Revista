import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-deporte',
  templateUrl: './deporte.page.html',
  styleUrls: ['./deporte.page.scss'],
})
export class DeportePage implements OnInit {
  articulos: Articulo[] = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.firestoreService.obtenerArticulosPorCategoria('deporte').subscribe(articulos => {
      this.articulos = articulos;
    });
  }

}
