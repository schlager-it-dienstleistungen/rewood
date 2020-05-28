import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';


@NgModule({
	declarations: [AdminComponent, CreateSupplierComponent, CreateProductComponent, ProductFormComponent, SupplierFormComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		CoreModule,
		AdminRoutingModule,
		ReactiveFormsModule
	]
})
export class AdminModule { }
