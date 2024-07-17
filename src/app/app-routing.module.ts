import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ciencia',
    loadChildren: () => import('./pages/ciencia/ciencia.module').then( m => m.CienciaPageModule)
  },
  {
    path: 'tecnologia',
    loadChildren: () => import('./pages/tecnologia/tecnologia.module').then( m => m.TecnologiaPageModule)
  },
  {
    path: 'deporte',
    loadChildren: () => import('./pages/deporte/deporte.module').then( m => m.DeportePageModule)
  },
  {
    path: 'homeadmin',
    loadChildren: () => import('./backend/admin/homeadmin/homeadmin.module').then( m => m.HomeadminPageModule)
  },
  {
    path: 'articulos',
    loadChildren: () => import('./backend/admin/articulos/articulos.module').then( m => m.ArticulosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
