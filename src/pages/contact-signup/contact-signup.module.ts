import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactSignupPage } from './contact-signup';

@NgModule({
  declarations: [
    ContactSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactSignupPage),
  ],
})
export class ContactSignupPageModule {}
