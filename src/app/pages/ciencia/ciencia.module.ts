import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CienciaPageRoutingModule } from './ciencia-routing.module';

import { ComponentesModule } from "../../componentes/componentes.module";
import { CienciaPage } from './ciencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CienciaPageRoutingModule,
    ComponentesModule
],
  declarations: [CienciaPage]
})
export class CienciaPageModule {}
