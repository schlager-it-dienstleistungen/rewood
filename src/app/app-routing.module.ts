// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';
import { AboutComponent } from './views/pages/general/about/about.component';
import { TeamComponent } from './views/pages/general/team/team.component';
import { ContactComponent } from './views/pages/general/contact/contact.component';
import { DsgvoComponent } from './views/pages/general/dsgvo/dsgvo.component';
import { AgbComponent } from './views/pages/general/agb/agb.component';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: '',
		component: BaseComponent,
		children: [
			{
				path: 'home',
				loadChildren: () => import('./views/pages/home/home.module').then(m => m.HomeModule)
			},
			{
				path: 'products',
				loadChildren: () => import('./views/pages/products/products.module').then(m => m.ProductsModule)
			},
			{
				path: 'admin',
				loadChildren: () => import('./views/pages/admin/admin.module').then(m => m.AdminModule),
				canActivate: [AuthGuard]
			},
			{
				path: 'builder',
				loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'general/about',
				component: AboutComponent
			},
			{
				path: 'general/team',
				component: TeamComponent
			},
			{
				path: 'general/contact',
				component: ContactComponent
			},
			{
				path: 'general/dsgvo',
				component: DsgvoComponent
			},
			{
				path: 'general/agb',
				component: AgbComponent
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'home', pathMatch: 'full'},
			{path: '**', redirectTo: 'home', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
