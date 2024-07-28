import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public menuCtrl1: MenuController) { }

  ngOnInit() {
  }

  openMenu1(){
    this.menuCtrl1.close('menuHome') // Cierra todos los menús antes de abrir el nuevo
    this.menuCtrl1.toggle('menuHome');
  }

}
