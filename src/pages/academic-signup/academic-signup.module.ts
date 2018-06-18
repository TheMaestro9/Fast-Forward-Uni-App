import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcademicSignupPage } from './academic-signup';

@NgModule({
  declarations: [
    AcademicSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(AcademicSignupPage),
  ],
})
export class AcademicSignupPageModule {}
