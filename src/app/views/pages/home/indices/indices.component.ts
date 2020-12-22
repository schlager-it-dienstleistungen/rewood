import { Component, OnInit } from '@angular/core';
import { HttpDataService } from '../../shared/http-data.service';

@Component({
	selector: 'rw-indices',
templateUrl: './indices.component.html',
	styleUrls: ['./indices.component.scss']
})
export class IndicesComponent implements OnInit {
	exchangeRatesDate: '...';
	chf: number;
	usd: number;
	gbp: number;
	cny: number;

	constructor(private httpDataService: HttpDataService) { }

	ngOnInit() {
    this.httpDataService.getLatestCurrencyExchangeRates().subscribe((data: any[])=>{
			//console.log(data);
			this.exchangeRatesDate = data['date'];
			this.chf = data['rates']['CHF'];
			this.usd = data['rates']['USD'];
			this.gbp = data['rates']['GBP'];
			this.cny = data['rates']['CNY'];
    })
  }

}
