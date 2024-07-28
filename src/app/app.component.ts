import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private menuCtrl: MenuController, private router: Router) {}

  async cerrarSesionAdmin() {
    await this.menuCtrl.close('menuHomeAdmin'); // Cierra el menú admin si está abierto
    this.router.navigate(['/login']); // Redirige al login
  }

  async cerrarSesionHome() {
    await this.menuCtrl.close('menuHome'); // Cierra el menú home si está abierto
    this.router.navigate(['/login']); // Redirige al login
  }
}
