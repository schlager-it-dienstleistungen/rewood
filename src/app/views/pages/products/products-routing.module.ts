import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'categories',
	},
	{
		path: 'allproducts',
		component: ProductListComponent
	},
	{
		path: 'categories',
		component: CategoryListComponent
	},
	{
		path: ':category',
		component: ProductsByCategoryComponent
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
