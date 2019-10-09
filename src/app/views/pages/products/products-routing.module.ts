import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductWithSearchComponent } from './product-with-search/product-with-search.component';


const routes: Routes = [
	{
		path: '',
		// component: MaterialComponent,
		children: [
			{
				path: '',
				redirectTo: 'productswithfilter',
				pathMatch: 'full'
			},
			{
				path: 'productswithfilter',
				component: ProductListComponent
			},
			{
				path: 'productswithsearch',
				component: ProductWithSearchComponent
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductsRoutingModule { }
