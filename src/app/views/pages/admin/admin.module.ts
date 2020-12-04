import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from 'src/app/core/core.module';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { DropzoneDirective } from './uploader/dropzone.directive';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserRolesListComponent } from './user/user-edit/subs/user-roles-list/user-roles-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';
import { UserNotificationsListComponent } from './user/user-edit/subs/user-notifications-list/user-notifications-list.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { SupplierEditComponent } from './supplier/supplier-edit/supplier-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
	declarations: [AdminComponent, UploaderComponent, UploadTaskComponent, DropzoneDirective, UserListComponent, UserEditComponent,
		UserRolesListComponent, UserNotificationsListComponent, SupplierListComponent, SupplierEditComponent,
		ProductListComponent, ProductEditComponent],
	imports: [
		MatInputModule,
		CommonModule,
		FormsModule,
		PartialsModule,
		CoreModule,
		AdminRoutingModule,
		ReactiveFormsModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatFormFieldModule,
		MatIconModule,
		MatSelectModule,
		MatOptionModule,
		MatButtonModule,
		MatTooltipModule,
		MatOptionModule,
		MatCheckboxModule
	]
})
export class AdminModule { }
