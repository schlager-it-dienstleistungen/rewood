import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import {
	MatTableModule,
	MatPaginatorModule,
	MatSortModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatCardModule,
	MatGridListModule,
	MatIconModule,
	MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterProductsComponent } from './filter-products/filter-products.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { ProductWithSearchComponent } from './product-with-search/product-with-search.component';
import { CardLayoutComponent } from './card-layout/card-layout.component';
import { PartialsModule } from '../../partials/partials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
	declarations: [
		ProductListComponent,
		FilterProductsComponent,
		SearchProductsComponent,
		ProductWithSearchComponent,
		CardLayoutComponent,
		ProductTableComponent,
		ProductCardsComponent,
		ProductDetailsComponent
	],
	imports: [
		FlexLayoutModule,
		CommonModule,
		PortletModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatCardModule,
		MatGridListModule,
		MatIconModule,
		MatButtonModule,
		ProductsRoutingModule,
		ReactiveFormsModule,
		PartialsModule
	]
})
export class ProductsModule { }
