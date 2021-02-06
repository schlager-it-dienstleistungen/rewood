import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionNotificationComponent, DeleteEntityDialogComponent } from '../../partials/content/crud';

export enum MessageType {
	Create,
	Read,
	Update,
	Delete
}

export enum PanelClass {
	INFO = 'info_class',
	ERROR = 'error_class'
}

/**
 * From LayoutUtilsService
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
		private snackBar: MatSnackBar,
		private dialog: MatDialog) { }

	/**
	 * Showing (Mat-Snackbar) Notification
	 *
	 * @param message: string
	 * @param type: MessageType
	 * @param duration: number
	 * @param showCloseButton: boolean
	 * @param showUndoButton: boolean
	 * @param undoButtonDuration: number
	 * @param verticalPosition: 'top' | 'bottom' = 'top'
	 * @param panelClass: PanelClass
	 */
	showActionNotification(
		_message: string,
		_type: MessageType = MessageType.Create,
		_panelClass: PanelClass = PanelClass.INFO
	) {
		const _duration: number = 10000;
		const _showCloseButton: boolean = true;
		const _showUndoButton: boolean = false;
		const _undoButtonDuration: number = 3000;
		const _verticalPosition: 'top' | 'bottom' = 'bottom';

		const _data = {
			message: _message,
			snackBar: this.snackBar,
			showCloseButton: _showCloseButton,
			showUndoButton: _showUndoButton,
			undoButtonDuration: _undoButtonDuration,
			verticalPosition: _verticalPosition,
			type: _type,
			action: 'Undo'
		};
		return this.snackBar.openFromComponent(ActionNotificationComponent, {
			duration: _duration,
			data: _data,
			verticalPosition: _verticalPosition,
			panelClass: _panelClass
		});
	}

	/**
	 * Showing Confirmation (Mat-Dialog) before Entity Removing
	 *
	 * @param title: stirng
	 * @param description: stirng
	 * @param waitDesciption: string
	 */
	deleteElement(title: string = '', description: string = '', waitDesciption: string = '') {
		return this.dialog.open(DeleteEntityDialogComponent, {
			data: { title, description, waitDesciption },
			width: '440px'
		});
	}
}
