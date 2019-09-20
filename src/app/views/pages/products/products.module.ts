import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';


@NgModule({
	declarations: [ProductListComponent],
	imports: [
		CommonModule,
		PortletModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		ProductsRoutingModule
	]
})
export class ProductsModule { }
