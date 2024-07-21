import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoregeService {

  constructor(public fireStorage: AngularFireStorage) { }
}
