import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../modelsDatabase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  private articuloSource = new BehaviorSubject<Articulo | null>(null);
  currentArticulo = this.articuloSource.asObservable();

  constructor(public database: AngularFirestore) { }
  //funcion crear articulo
  crearArticulo(data: any, path: string, id: string){
    const coleccion = this.database.collection(path);
    return coleccion.doc(id).set(data);
  }

  //funcion obtener articulo
  obtenerArticulo(path: string, id: string){
    const coleccion = this.database.collection(path);
    return coleccion.doc(id).valueChanges();
  }

  //funcion para eliminar un articulo
  eliminarArticulo(path: string, id: string){
    const coleccion = this.database.collection(path);
    return coleccion.doc(id).delete();
  }

  // funcion para actualizar un articulo
  actulizarArticulo(data: string, path: string, id: string){
    const coleccion = this.database.collection(path);
    return coleccion.doc(id).update(data);
  }

  getId(){
    return this.database.createId();
  }


  obtenerLaColeccionXD<Tipo>(path: string){
    const coleccion = this.database.collection<Tipo>(path);
    return coleccion.valueChanges();
  }
  

  changeArticulo(articulo: Articulo) {
    this.articuloSource.next(articulo);
  }

}
  


