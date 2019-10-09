import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterProductsComponent } from './filter-products/filter-products.component';


@NgModule({
	declarations: [ProductListComponent, FilterProductsComponent],
	imports: [
		CommonModule,
		PortletModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ProductsRoutingModule,
		ReactiveFormsModule
	]
})
export class ProductsModule { }
