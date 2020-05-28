import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'rw-create-supplier',
	templateUrl: './create-supplier.component.html',
	styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {

	@ViewChild('wizard', {static: true}) el: ElementRef;
	submitted = false;
	model: any = {
		fname: 'John',
		lname: 'Wick',
		phone: '+61412345678',
		email: 'john.wick@reeves.com',
		address1: 'Address Line 1',
		address2: 'Address Line 2',
		postcode: '3000',
		city: 'Melbourne',
		state: 'VIC',
		country: 'AU',
		delivery: 'overnight',
		packaging: 'regular',
		preferreddelivery: 'morning',
		locaddress1: 'Address Line 1',
		locaddress2: 'Address Line 2',
		locpostcode: '3072',
		loccity: 'Preston',
		locstate: 'VIC',
		loccountry: 'AU',
		ccname: 'John Wick',
		ccnumber: '4444 3333 2222 1111',
		ccmonth: '01',
		ccyear: '21',
		cccvv: '123',
	};

	constructor() { }

	ngOnInit() {
	}

}
