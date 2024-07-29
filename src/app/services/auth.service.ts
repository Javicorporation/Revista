import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private auth = inject(Auth); 
  // private firestore = inject(Firestore);

  constructor(public database: AngularFirestore) {}

  // private getCollectionData(path: string): Promise<any[]> {
  //   const coleccion = this.database.collection(path);
  //   return coleccion.get().toPromise().then(snapshot => {
  //     const data = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
  //     return data;
  //   });
  // }

  login(email: string, password: string,path: string): Promise<any[]> {
    const coleccion: AngularFirestoreCollection<any> = this.database.collection(path);
    
    return coleccion.get().toPromise().then(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return data;
    });
  }

  // validateUser(email: string, password: string, path: string): Promise<string | null> {
  //   return this.getCollectionData(path).then(data => {
  //     const user = data.find(user => user.email === email);
  //     if (user && user.password === password) {
  //       return user.role || null;
  //     } else {
  //       return null;
  //     }
  //   });
  // }
}
