import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

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

      task.snapshotChanges().pipe(
        finalize( () => {
          ref.getDownloadURL().subscribe(res =>{
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      ).subscribe();

    });

  }
}
 