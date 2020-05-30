import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Picture } from '../../shared/picture';

@Component({
	selector: 'rw-uploader',
	templateUrl: './uploader.component.html',
	styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

	isHovering: boolean;

	@Input() pictures: Picture[];

	toggleHover(event: boolean) {
		this.isHovering = event;
	}

	onDrop(uploadFiles: FileList) {
		for (let i = 0; i < uploadFiles.length; i++) {
			this.pictures.push(this.fromFile(uploadFiles.item(i)));
		}
	}

	fromFile(file: File): Picture {
		return {
			title: file.name,
			path: `products/${Date.now()}_${file.name}`, // The storage path
			url: '',
			file
		};
	}
}
