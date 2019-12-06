import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import {
	MatCardModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsComponent } from './products.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';

@NgModule({
	declarations: [
		ProductsComponent,
		ProductcategoriesComponent
	],
	imports: [
		FlexLayoutModule,
		CommonModule,
		PortletModule,
		MatCardModule,
		ProductsRoutingModule,
		ReactiveFormsModule,
		PartialsModule
	]
})
export class ProductsModule { }
