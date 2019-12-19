import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
	{
		path: '',
		component: ProductsComponent,
		children: [
			{
				path: 'categories',
				component: ProductCategoryComponent
			},
			{
				path: ':category',
				component: ProductListComponent
			}

/*			,
			{
				path: 'productswithsearch',
				component: ProductWithSearchComponent
			},
			{
				path: 'productcards',
				component: ProductCardsComponent
			},
			{
				path: 'cardlayout',
				component: CardLayoutComponent
			},
			{
				path: 'products/:id',
				component: ProductDetailsComponent
			}*/
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductsRoutingModule { }
