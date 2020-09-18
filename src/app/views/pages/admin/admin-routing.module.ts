import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'createSupplier',
				component: CreateSupplierComponent
			},
			{
				path: 'createProduct',
				component: CreateProductComponent
			},
			{
				path: 'users',
				component: UserListComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
