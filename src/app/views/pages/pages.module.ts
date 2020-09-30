// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { AboutComponent } from './general/about/about.component';
import { TeamComponent } from './general/team/team.component';
import { ContactComponent } from './general/contact/contact.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [AboutComponent, TeamComponent, ContactComponent, LoginEmailComponent],
	exports: [],
	imports: [
		CommonModule,
		CoreModule,
		PartialsModule,
		HomeModule,
		ProductsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: []
})
export class PagesModule {
}
