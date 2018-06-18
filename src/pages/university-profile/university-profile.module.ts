import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniversityProfilePage } from './university-profile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UniversityProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UniversityProfilePage),
    ComponentsModule
  ],
})
export class UniversityProfilePageModule {}
