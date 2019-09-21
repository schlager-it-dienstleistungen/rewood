import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Product } from '../shared/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, delay } from 'rxjs/operators';
import { Subscription, fromEvent } from 'rxjs';

@Component({
	selector: 'sw-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
	// Paginator
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	// Sort
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput', {static: true}) searchInput: ElementRef;

	// Table Fields
	displayedColumns = ['id', 'title', 'category', 'subcategory', 'description'];
	products: Product[];
	dataSource: MatTableDataSource<Product>;

	constructor() { }

	ngOnInit() {
		this.loadProductsList();
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

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	/**
	 * Load Products List
	 */
	loadProductsList() {
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
	}
}
