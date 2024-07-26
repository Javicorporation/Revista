import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestoregeService } from 'src/app/services/firestorege.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  //lista de articulos
  articulos: Articulo[] = [];

  //lista de imagenes
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  selectedImages: File[] = [];
  imagenesSeleccionadas: string[] =[];

  // articulos vacios
  newArticulo: Articulo = {
    tituloDeArticulo: '',
    categoria: '',
    resumenDelArticulo: '',
    fechaPublicacion: new Date,
    autor: '',
    informacion: '',
    foto: '',
    id: this.firestoreService.getId()
  };

  private path= 'Articulos/'
  newImagen: string | ArrayBuffer | null = null;
  newFile = "";

  // implementaciones en el controlador de el menu, cargar y alertas
  constructor(public menuCtrl: MenuController, 
    public firestoreService: FirestoreService,
    private alertController: AlertController, 
    private loadingCtrl: LoadingController,
    public fireStorage: FirestoregeService) { }

  ngOnInit() {
    // Implementación de los artículos en el adminhome por medio de la suscripción a firestore
    this.firestoreService.currentArticulo.subscribe(articulo => {
      if (articulo) {
        this.newArticulo = articulo;
      }
    });
  }

  //mostrar menu
  openMenu(){
    this.menuCtrl.toggle("menu1");
  }



  //Método guardar artículo, con la validación de ingreso de datos en las cajas de texto que no permite guardar si todos los datos no estan completados
  async guardarArticulo() {
    if (!this.newArticulo.tituloDeArticulo || !this.newArticulo.categoria || !this.newArticulo.resumenDelArticulo || !this.newArticulo.fechaPublicacion || !this.newArticulo.autor ||!this.newArticulo.informacion){
      // creacion de una variable para la alerta de los campos vacios
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      // implementacion del loading
      const loading = await this.loadingCtrl.create({ message: "jajaja hola...", duration: 6000,});
      await loading.present();

      // si todo esta bien se guarda el articulo y se muestra en el home admin
      try{
        const path = 'Articulos/';
        this.firestoreService.crearArticulo(this.newArticulo, this.path, this.newArticulo.id);
        // si no muestra un error en la consola
      }catch(error){
        console.error(error);
      }finally{
        loading.dismiss();
      }
      
    }
  }

  /*
  traerTodosLosarticulos(){
    this.firestoreService.obtenerLaColeccionXD<Articulo>(this.path).subscribe(rest =>{
      this.articulos = rest;
    })
  }

  eliminarArticulo(articulo: Articulo){
    this.firestoreService.eliminarArticulo(this.path, articulo.id);
  }
  */

  // metodo limpiar campos
  limpiarCampos() {
    this.newArticulo = {
      tituloDeArticulo: '',
      categoria: '',
      resumenDelArticulo: '',
      fechaPublicacion: new Date(),
      autor: '',
      informacion: '',
      foto: '',
      id: this.firestoreService.getId()
    };

    this.imagenesSeleccionadas = [];
  }






  // metodo escoger imagen a subir a storage firebase
  async newImgSeleccionadas(event: any) {
    this.newFile = event.target.files[0];
    // creacion de constante  nombre de la carpeta a crear
    const path = 'Articulos';
    // creacion de constante  nombre del archivo a subir
    const name = this.newArticulo.tituloDeArticulo;
    // la posicion de la imagen
    const files = event.target.files[0];
    // para la eleccion de varias imagenes
    /*const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const res = await this.fireStorage.subirImagen(file, path, `${name}_${i}`);
      console.log('Recibi res de la promesa', res);
    }*/
    // creacion de variable que instancia el servicio
    const res = await this.fireStorage.subirImagen(files, path,name);
    this.newArticulo.foto = res;
    console.log("esta es tu imagen", res);
    }  
    


















    // metodo mostrar
  mostrarImgs(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.newImagen = reader.result;
      this.imagenesSeleccionadas.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  }

  
  


