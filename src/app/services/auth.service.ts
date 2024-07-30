import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public database: AngularFirestore) {}

  // login(email: string, password: string,path: string): Promise<any[]> {
  //   const coleccion: AngularFirestoreCollection<any> = this.database.collection(path);
    
  //   return coleccion.get().toPromise().then(snapshot => {
  //     const data = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
  //     return data;
  //   });
  // }

  async login(email: string, password: string, collection: string): Promise<any[]> {
    const snapshot = await this.database.collection(collection).ref.get();
    return snapshot.docs.map(doc => doc.data());
  }

  addUser(data: any) {
    this.database.collection('Users').add(data)
      .then(() => {
        console.log("Usuario registrado con éxito");
        alert("Usuario registrado con éxito");
      })
      .catch(error => {
        console.error("Error al registrar el usuario: ", error);
        alert("Error al registrar el usuario: " + error.message);
      });
  }
}
