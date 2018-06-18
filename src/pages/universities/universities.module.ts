import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniversitiesPage } from './universities';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UniversitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(UniversitiesPage),
    ComponentsModule
  ],
})
export class UniversitiesPageModule {}
