import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductcategoriesComponent } from './productcategories/productcategories.component';


const routes: Routes = [
	{
		path: '',
		component: ProductsComponent,
		children: [
			{
				path: '',
				component: ProductcategoriesComponent
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
