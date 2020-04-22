import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule } from '@angular/forms';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
	declarations: [AdminComponent, CreateSupplierComponent, CreateProductComponent],
	imports: [
		CommonModule,
		FormsModule,
		PartialsModule,
		CoreModule,
		AdminRoutingModule
	]
})
export class AdminModule { }
