import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeportePageRoutingModule } from './deporte-routing.module';

import { ComponentesModule } from "../../componentes/componentes.module";
import { DeportePage } from './deporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeportePageRoutingModule,
    ComponentesModule
],
  declarations: [DeportePage]
})
export class DeportePageModule {}
