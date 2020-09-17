import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
	selector: 'sw-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private permissionsService: NgxPermissionsService) { }

	ngOnInit() {
		this.permissionsService.permissions$.subscribe((permissions) => {
			console.log('permissions: ' + JSON.stringify(permissions));
		});
	}

}
