import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { NewsComponent } from './news/news.component';
import { CategoryLinkComponent } from './category-link/category-link.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { IndicesComponent } from './indices/indices.component';
import { LatestProductsComponent } from './latest-products/latest-products.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		MatTableModule,
		CoreModule,
		NgxPermissionsModule.forChild(),
		RouterModule.forChild([
			{
				path: '',
				component: HomeComponent
			},
		]),
	],
	providers: [],
	declarations: [
		HomeComponent,
		NewsComponent,
		CategoryLinkComponent,
		IndicesComponent,
		LatestProductsComponent,
	]
})
export class HomeModule { }
