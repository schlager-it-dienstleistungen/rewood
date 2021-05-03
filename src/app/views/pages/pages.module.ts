// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { AboutComponent } from './general/about/about.component';
import { TeamComponent } from './general/team/team.component';
import { ContactComponent } from './general/contact/contact.component';
import { DsgvoComponent } from './general/dsgvo/dsgvo.component';
import { MapComponent } from './general/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { AgbComponent } from './general/agb/agb.component';

@NgModule({
	declarations: [AboutComponent, TeamComponent, ContactComponent, DsgvoComponent, MapComponent, AgbComponent],
	exports: [],
	imports: [
		CommonModule,
		CoreModule,
		PartialsModule,
		HomeModule,
		ProductsModule,
		AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqmWi9KjWwRaGYjmRiDUp5UReGuAyt3Ro'
    })
	],
	providers: []
})
export class PagesModule {
}
