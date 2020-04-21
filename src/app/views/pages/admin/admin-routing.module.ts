import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';


const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'createSupplier',
				component: CreateSupplierComponent
			}/*,
			{
				path: 'createCustomer',
				component: ProductListComponent
			}*/
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
