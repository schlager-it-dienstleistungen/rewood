import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'categories',
	},
	{
		path: 'categories',
		component: ProductCategoryComponent
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
