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

@NgModule({
	declarations: [AboutComponent, TeamComponent, ContactComponent, DsgvoComponent],
	exports: [],
	imports: [
		CommonModule,
		CoreModule,
		PartialsModule,
		HomeModule,
		ProductsModule
	],
	providers: []
})
export class PagesModule {
}
