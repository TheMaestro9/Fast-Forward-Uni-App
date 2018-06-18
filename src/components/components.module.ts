import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { IonicModule } from 'ionic-angular';
import { MediaSampleItemComponent } from './media-sample-item/media-sample-item';
@NgModule({
	declarations: [
		HeaderComponent , 
		MediaSampleItemComponent
	],
	imports: [IonicModule],
	exports: [
		HeaderComponent,
		MediaSampleItemComponent
	]
})
export class ComponentsModule {}
