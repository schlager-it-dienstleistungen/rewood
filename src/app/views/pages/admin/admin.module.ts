import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
	declarations: [AdminComponent, CreateSupplierComponent, CreateProductComponent],
	imports: [
		CommonModule,
		AdminRoutingModule
	]
})
export class AdminModule { }
