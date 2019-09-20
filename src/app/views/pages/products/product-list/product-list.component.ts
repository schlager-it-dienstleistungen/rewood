import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from '../shared/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
	selector: 'sw-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
	products: Product[];
	dataSource: MatTableDataSource<Product>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	displayedColumns = ['id', 'title', 'category', 'subcategory', 'description'];

	constructor() { }

	ngOnInit() {
	this.products = [
			{
				id: '1',
				title: 'Spaplatte',
				category: 'Spanplatte',
				subcategory: '',
				description: 'um 2 Zentimeter zu kurz'
			},
			{
				id: '2',
				title: 'Pfosten',
				category: 'Bauholz',
				subcategory: 'Pfosten',
				description: '2,53 statt 2,50 Meter'
			},
			{
				id: '3',
				title: 'Laminiertes Brett',
				category: 'Brett',
				description: 'mit Buche statt Eiche furniert'
			},
			{
				id: '4',
				title: 'Rigips',
				category: 'kein Holz',
				description: 'Leider kein Holz'
			}
		];

	this.dataSource = new MatTableDataSource<Product>(this.products);
	}

 /**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

}
