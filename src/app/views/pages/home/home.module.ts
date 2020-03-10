import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { NewsComponent } from './news/news.component';
import { CredoComponent } from './credo/credo.component';
import { CategoryLinkComponent } from './category-link/category-link.component';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomeComponent
			},
		]),
	],
	providers: [],
	declarations: [
		HomeComponent,
		NewsComponent,
		CredoComponent,
		CategoryLinkComponent,
	]
})
export class HomeModule { }
