import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import {
	MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsComponent } from './products.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
	declarations: [
		ProductsComponent,
		ProductCategoryComponent,
		ProductListComponent
	],
	imports: [
		FlexLayoutModule,
		CommonModule,
		PortletModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		ProductsRoutingModule,
		ReactiveFormsModule,
		PartialsModule
	]
})
export class ProductsModule { }
