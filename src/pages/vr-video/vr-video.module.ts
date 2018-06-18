import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VrVideoPage } from './vr-video';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    VrVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(VrVideoPage),
    ComponentsModule
  ],
})
export class VrVideoPageModule {}
