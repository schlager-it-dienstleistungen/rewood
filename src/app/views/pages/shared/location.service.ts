import { Injectable } from '@angular/core';
import { Country } from './country';

@Injectable({
	providedIn: 'root'
})
export class LocationService {

	constructor() { }

	static getCountries(): Country[] {
		return [
			{
				code: 'AT',
				country: 'Österreich'
			},
			{
				code: 'DE',
				country: 'Deutschland'
			}
		];
	}
}
