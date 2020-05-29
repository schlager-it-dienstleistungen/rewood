import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';

@Component({
	selector: 'rw-upload-task',
	templateUrl: './upload-task.component.html',
	styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

	@Input() file: File;

	task: AngularFireUploadTask;

	percentage: Observable<number>;
	snapshot: Observable<any>;
	downloadURL: string;

	constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

	ngOnInit() {
		this.startUpload();
	}

	startUpload() {

		// The storage path
		const path = `products/${Date.now()}_${this.file.name}`;

		// Reference to storage bucket
		const ref = this.storage.ref(path);

		// The main task
		this.task = this.storage.upload(path, this.file);

		// Progress monitoring
		this.percentage = this.task.percentageChanges();

		this.snapshot   = this.task.snapshotChanges().pipe(
			tap(console.log),
			// The file's download URL
			finalize(async () =>  {
				this.downloadURL = await ref.getDownloadURL().toPromise();

				this.db.collection('files').add( { downloadURL: this.downloadURL, path });
			}),
		);
	}

	isActive(snapshot) {
		return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
	}

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

	deleteFile() {
		console.log(this.downloadURL);
	}

}
