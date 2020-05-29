import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
	selector: '[rwDropzone]'
})
export class DropzoneDirective {

	@Output() dropped =  new EventEmitter<FileList>();
	@Output() hovered =  new EventEmitter<boolean>();

	@HostListener('drop', ['$event'])
	onDrop($event) {
		console.log('onDrop: ');
		$event.preventDefault();
		this.dropped.emit($event.dataTransfer.files);
		this.hovered.emit(false);
	}

	@HostListener('dragover', ['$event'])
	onDragOver($event) {
		console.log('onDragOver: ');
		$event.preventDefault();
		this.hovered.emit(true);
	}

	@HostListener('dragleave', ['$event'])
	onDragLeave($event) {
		console.log('onDragLeave: ');
		$event.preventDefault();
		this.hovered.emit(false);
	}
}
