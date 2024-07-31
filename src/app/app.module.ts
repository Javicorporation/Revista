import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalArticuloComponent } from './componentes/modal-articulo/modal-articulo.component';

@NgModule({
  declarations: [AppComponent,ModalArticuloComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, AngularFireStorageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"appsrevistas","appId":"1:546212475086:web:c1e57d4dd5690397df209f","storageBucket":"appsrevistas.appspot.com","apiKey":"AIzaSyCfrKCaThdykwdXCkH5XKOKZp9f_FTYtRI","authDomain":"appsrevistas.firebaseapp.com","messagingSenderId":"546212475086","measurementId":"G-NZNZJSGWH9"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}
