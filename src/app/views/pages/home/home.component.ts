import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageType, NotificationService } from '../shared/notification.service';

@Component({
	selector: 'sw-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private notificationService: NotificationService
	) { }

	ngOnInit() {
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.login === 'true') {
					const message = `Sie wurden erfolgreich angemeldet.`;
					this.notificationService.showActionNotification(message, MessageType.Create);
				}
			});

		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.logout === 'true') {
					const message = `Sie wurden erfolgreich abgemeldet.`;
					this.notificationService.showActionNotification(message, MessageType.Create);
				}
			});
	}

}
