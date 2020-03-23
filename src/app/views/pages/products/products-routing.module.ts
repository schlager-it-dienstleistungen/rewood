import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'categories',
	},
	{
		path: 'categories',
		component: CategoryListComponent
	},
	{
		path: ':category',
		component: ProductListComponent
	},
	{
		path: 'product/:id',
		component: ProductDetailComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductsRoutingModule { }
