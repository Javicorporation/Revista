import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoregeService {

  constructor(public fireStorage: AngularFireStorage) { }

  // metodo pra subir una imagen por medio de las pomesas
  subirImagen(file: any, path: string, nombre: string): Promise<string>{
                    //( (resolve, reject) =>
    return new Promise( resolve =>{
      const filePath = path + '/'+nombre;
      const ref = this.fireStorage.ref(filePath);
      const task = ref.put(file);

      /*task.snapshotChanges().subscribe({
        complete: () => {
          ref.getDownloadURL().subscribe(downloadUrl => {
            resolve(downloadUrl);
          }, error => {
            reject(error);
          });
        },
        error: error => {
          reject(error);
        }
      });*/


      resolve("este es el enlace");

    });

  }
}
 