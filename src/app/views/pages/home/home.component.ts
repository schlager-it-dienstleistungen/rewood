import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';

@Component({
	selector: 'sw-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private layoutUtilsService: LayoutUtilsService
	) { }

	ngOnInit() {
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.login === 'true') {
					const message = `Sie wurden erfolgreich angemeldet.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 3000, true, false);
				}
			});

		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.logout === 'true') {
					const message = `Sie wurden erfolgreich abgemeldet.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 3000, true, false);
				}
			});
	}

}
