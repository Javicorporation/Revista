import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  tituloApp: string = 'REVISTA ECUADOR';
  subtituloApp: string = 'Bienvenido a tu fuente de noticias, cultura y entretenimiento.';

  constructor() { }

  ngOnInit() {
  }

}
