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
			},
			{
				code: 'IT',
				country: 'Italien'
			},
			{
				code: 'AL',
				country: 'Albania'
			},
			{
				code: 'BA',
				country: 'Bosnia and Herzegovina'
			},
			{
				code: 'BE',
				country: 'Belgium'
			},
			{
				code: 'BG',
				country: 'Bulgaria'
			},
			{
				code: 'BR',
				country: 'Brazil'
			},
			{
				code: 'BY',
				country: 'Belarus'
			},
			{
				code: 'CH',
				country: 'Switzerland'
			},
			{
				code: 'CN',
				country: 'China'
			},
			{
				code: 'CZ',
				country: 'Czechia'
			},
			{
				code: 'DK',
				country: 'Denmark'
			},
			{
				code: 'EE',
				country: 'Estonia'
			},
			{
				code: 'IE',
				country: 'Ireland'
			},
			{
				code: 'EL',
				country: 'Greece'
			},
			{
				code: 'ES',
				country: 'Spain'
			},
			{
				code: 'FI',
				country: 'Finland'
			},
			{
				code: 'FR',
				country: 'France'
			},
			{
				code: 'HR',
				country: 'Croatia'
			},
			{
				code: 'CY',
				country: 'Cyprus'
			},
			{
				code: 'IS',
				country: 'Iceland'
			},
			{
				code: 'LI',
				country: 'Liechtenstein'
			},
			{
				code: 'LV',
				country: 'Latvia'
			},
			{
				code: 'LT',
				country: 'Lithuania'
			},
			{
				code: 'LU',
				country: 'Luxembourg'
			},
			{
				code: 'HU',
				country: 'Hungary'
			},
			{
				code: 'ME',
				country: 'Montenegro'
			},
			{
				code: 'MK',
				country: 'North Macedonia'
			},
			{
				code: 'MT',
				country: 'Malta'
			},
			{
				code: 'NL',
				country: 'Netherlands'
			},
			{
				code: 'NO',
				country: 'Norway'
			},
			{
				code: 'PL',
				country: 'Poland'
			},
			{
				code: 'RS',
				country: 'Serbia'
			},
			{
				code: 'PT',
				country: 'Portugal'
			},
			{
				code: 'RO',
				country: 'Romania'
			},
			{
				code: 'SI',
				country: 'Slovenia'
			},
			{
				code: 'SK',
				country: 'Slovakia'
			},
			{
				code: 'SE',
				country: 'Sweden'
			},
			{
				code: 'TR',
				country: 'Turkey'
			},
			{
				code: 'UA',
				country: 'Ukraine'
			},
			{
				code: 'UK',
				country: 'United Kingdom'
			}
		];
	}
}
