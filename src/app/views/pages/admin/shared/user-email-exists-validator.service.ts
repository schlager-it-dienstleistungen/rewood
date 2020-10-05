import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserStoreService } from '../../shared/user-store.service';

@Injectable({
	providedIn: 'root'
})
export class UserEmailExistsValidatorService implements AsyncValidator {

	constructor(
		private userStoreService: UserStoreService
	) { }

	validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
		return this.userStoreService.doesUserExists(control.value).pipe(
			map(exists => (exists === false) ? null : control.setErrors({UserEmailExists: true})),
			catchError(() => of(null))
		);
	}

	registerOnValidatorChange?(fn: () => void): void {
		throw new Error('Method not implemented.');
	}
}
