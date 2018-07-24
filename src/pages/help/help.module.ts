import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpPage } from './help';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HelpPage,
    
  ],
  imports: [
    IonicPageModule.forChild(HelpPage),
    ComponentsModule,
    
  ],
  providers: [
  InAppBrowser,
  ]
})
export class HelpPageModule {}
