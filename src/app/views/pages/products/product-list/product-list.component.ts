import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../shared/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormBuilder} from '@angular/forms';

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

	// Search
	searchForm: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.initForm();
		this.loadProductsList();
		this.dataSource = new MatTableDataSource<Product>(this.products);
	}

 /**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.initForm();
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	private initForm() {
		this.searchForm = this.fb.group({
			title: [''],
			category: [''],
			price_from: [''],
			price_to: ['']
		});
	}

	/**
	 * Search Products
	 */
	searchProducts() {
		const searchValues = this.searchForm.value;
		if (searchValues.title) {
			this.dataSource.filterPredicate = (data: Product, filter: string) => data.title.indexOf(filter) !== -1;

			this.dataSource.filter = searchValues.title;
		}
		if (searchValues.category) {
			this.dataSource.filterPredicate = (data: Product, filter: string) => data.category.indexOf(filter) !== -1;

			this.dataSource.filter = searchValues.category;
		}

	// TODO RangeFilter: https://stackoverflow.com/questions/48276404/filtering-specific-column-in-angular-material-table-in-angular-5/48400406?noredirect=1#comment84008277_48400406
	}

	/**
	 * Reset Search Formular
	 */
	resetSearchForm() {
		this.dataSource.filter = '';
		this.initForm();
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
