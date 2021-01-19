import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Picture } from '../../shared/picture';

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
	// snapshot: Observable<any>;
	downloadURL: Observable<string>;

	constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

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
		this.downloadURL = of(this.picture.url);
		this.picture.toDelete = false;
	}

	startUpload() {
		// Reference to storage bucket
		const ref = this.storage.ref(this.picture.path);

		// The main task
		this.task = this.storage.upload(this.picture.path, this.picture.file);

		// Progress monitoring
		this.percentage = this.task.percentageChanges();

		this.task.snapshotChanges()
			.pipe(
				finalize(() => {
					this.downloadURL = ref.getDownloadURL();
					this.downloadURL.subscribe(url => {
						if (url) {
							this.picture.url = this.changeDownloadUrlAfterResize(url);
						}
					});
				})
			)
			.subscribe(url => {
				if (url) {
					console.log('url: ' + url);
				}
			});

		/*this.snapshot = this.task.snapshotChanges().pipe(
			tap(console.log),
			// The file's download URL
			finalize(async () =>  {
				this.downloadURL = await ref.getDownloadURL().toPromise();

				this.picture.url = this.downloadURL;
			}),
		);*/
	}

	/**
	 * After Resizing in Firebase, the URL was altered
	 *
	 * @param url original DownloadUrl
	 */
	changeDownloadUrlAfterResize(url: string): string {
		console.log('orginalURL: ' + url);
		let indexOfQuestionMark = url.indexOf('?');
		let alteredUrl = url.substring(0, indexOfQuestionMark);
		alteredUrl += '_800x800';
		alteredUrl += url.substring(indexOfQuestionMark, url.length);
		console.log('alteredUrl: ' + alteredUrl);
		return alteredUrl;
	}

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
