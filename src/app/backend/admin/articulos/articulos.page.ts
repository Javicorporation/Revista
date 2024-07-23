import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Articulo } from 'src/app/modelsDatabase';
import { FirestoreService } from 'src/app/services/firestore.service';

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

  // implementaciones en el controlador de el menu, cargar y alertas
  constructor(public menuCtrl: MenuController, 
    public firestoreService: FirestoreService,
    private alertController: AlertController, 
    private loadingCtrl: LoadingController ) { }

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

  // metodo escoger imagenes
  imgSeleccionadas(event: Event) {
    // creacion de constante 
    const input = event.target as HTMLInputElement;
    //  si la cantidad de archivos es mayor a 0
    if (input.files && input.files.length > 0) {
      // implemetamos la variable en el array creado arriba en el inicio
      this.selectedImages = Array.from(input.files);
      // Implementación del array de imágenes seleccionadas creada arriba también XD 
      this.imagenesSeleccionadas = [];
      this.selectedImages.forEach(file => this.mostrarImgs(file))
      console.log('Imágenes seleccionadas:', this.selectedImages);
    }  
    this.mostrarImgs; 
  }

  // metodo mostrar
  mostrarImgs(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      //this.newImagen = reader.result;
      this.imagenesSeleccionadas.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

}
