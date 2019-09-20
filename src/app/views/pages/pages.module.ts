// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { ProductsModule } from './products/products.module';

@NgModule({
	declarations: [],
	exports: [],
	imports: [
		CommonModule,
		CoreModule,
		PartialsModule,
		ProductsModule
	],
	providers: []
})
export class PagesModule {
}
