import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { tap, finalize, delay } from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { Picture } from '../../shared/picture';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
	selector: 'rw-upload-task',
	templateUrl: './upload-task.component.html',
	styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

	@Input() picture: Picture;

	@Output() deletePicture = new EventEmitter<Picture>();

	task: AngularFireUploadTask;

	percentage: Observable<number>;

	constructor(
		private storage: AngularFireStorage,
		private ng2ImgMax: Ng2ImgMaxService
	) { }

	ngOnInit() {
		/**
		 * Start Upload only when new Picture
		 */
		if (this.picture.file) {
			this.startUpload();
		} else {
			this.loadExistingFile();
		}
	}

	loadExistingFile() {
		this.percentage = of(100);
		this.picture.toDelete = false;
	}

	dataURItoBlob(dataURI) {
		const byteString = window.atob(dataURI);
		const arrayBuffer = new ArrayBuffer(byteString.length);
		const int8Array = new Uint8Array(arrayBuffer);
		for (let i = 0; i < byteString.length; i++) {
			int8Array[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([int8Array], { type: 'image/png' });
		return blob;
 	}

	 startUpload() {
		this.ng2ImgMax.resizeImage(this.picture.file, 400, 400).subscribe(
			result => {
				// Reference to storage bucket
				const ref = this.storage.ref(this.picture.path);

				debugger;

				this.picture.file = new File(result, this.picture.title);

				// The main task
				this.task = this.storage.upload(this.picture.path, this.picture.file);

				// Progress monitoring
				this.percentage = this.task.percentageChanges();

				this.task.snapshotChanges()
					.pipe(
						finalize(() => {
							let downloadURL = ref.getDownloadURL();
							downloadURL.subscribe(url => {
								if (url) {
									this.picture.url = url;
								}
								console.log('this.picture.url: ' + this.picture.url);
							});
						})
					)
					.subscribe(url => {
						if (url) {
							console.log('url: ' + url);
						}
					});
			},
			error => {
				console.log('😢 Oh no!', error);
			}
		);



		/*this.snapshot = this.task.snapshotChanges().pipe(
			tap(console.log),
			// The file's download URL
			finalize(async () =>  {
				this.downloadURL = await ref.getDownloadURL().toPromise();

				this.picture.url = this.downloadURL;
			}),
		);*/
	}



		/*this.snapshot = this.task.snapshotChanges().pipe(
			tap(console.log),
			// The file's download URL
			finalize(async () =>  {
				this.downloadURL = await ref.getDownloadURL().toPromise();

				this.picture.url = this.downloadURL;
			}),
		);*/

/*
	delay(t) {
		return of(resolve => { setTimeout(resolve, t); });
	}

	keepTrying(triesRemaining, storageRef): Promise<any> {
		if (triesRemaining < 0) {
			return Promise.reject('out of tries');
		}

		return storageRef.getDownloadURL().subscribe(
			url => {return url;},
			error =>  {
				switch (error.code) {
					case 'storage/object-not-found':
						return this.delay(2000).subscribe(() => {
							return this.keepTrying(triesRemaining - 1, storageRef)
						});
					default:
						console.log(error);
						return Promise.reject(error);
				}
			}
		);
	}*/

	/*isActive(snapshot) {
		return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
	}*/

	/**
	 * format bytes
	 * @param bytes (File size in bytes)
	 * @param decimals (Decimals point)
	 */
	formatBytes(bytes, decimals = 2) {
		if (bytes === 0) {
			return '0 Bytes';
		}
		const k = 1024;
		const dm = decimals <= 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	/**
	 * Delete Picture from Storage and Fire Event to Uploader
	 */
	deleteFile() {
		console.log('deleteFile: ' + this.picture.path);
		this.picture.toDelete = true;
		this.deletePicture.emit(this.picture);
	}
}
