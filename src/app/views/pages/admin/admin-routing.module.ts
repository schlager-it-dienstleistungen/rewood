import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';


const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'suppliers',
				component: SupplierListComponent
			},
			{
				path: 'createProduct',
				component: CreateProductComponent
			},
			{
				path: 'users',
				component: UserListComponent
			},
			{
				path: 'users:id',
				component: UserListComponent
			},
			{
				path: 'users/add',
				component: UserEditComponent
			},
			{
				path: 'users/add:id',
				component: UserEditComponent
			},
			{
				path: 'users/edit',
				component: UserEditComponent
			},
			{
				path: 'users/edit/:id',
				component: UserEditComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
