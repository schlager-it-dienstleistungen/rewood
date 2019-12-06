// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';

@NgModule({
	declarations: [],
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
