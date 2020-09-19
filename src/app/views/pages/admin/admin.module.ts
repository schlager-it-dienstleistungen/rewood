import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { DropzoneDirective } from './uploader/dropzone.directive';
import { UserListComponent } from './user-list/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
	declarations: [AdminComponent,
		CreateSupplierComponent, CreateProductComponent, ProductFormComponent, SupplierFormComponent,
		UploaderComponent, UploadTaskComponent, DropzoneDirective, UserListComponent],
	imports: [
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
		MatInputModule,
		MatIconModule
	]
})
export class AdminModule { }
