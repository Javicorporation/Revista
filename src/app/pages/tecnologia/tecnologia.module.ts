import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TecnologiaPageRoutingModule } from './tecnologia-routing.module';

import { ComponentesModule } from "../../componentes/componentes.module";
import { TecnologiaPage } from './tecnologia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TecnologiaPageRoutingModule,
    ComponentesModule
],
  declarations: [TecnologiaPage]
})
export class TecnologiaPageModule {}
