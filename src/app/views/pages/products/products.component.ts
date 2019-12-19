import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'sw-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		this.router.navigate(
			['categories'],
			{ relativeTo: this.route }
		);
	}
}
