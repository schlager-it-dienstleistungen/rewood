import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { News } from '../shared/news';

@Component({
	selector: 'rw-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
	@Input() newsIndex: number;
	news: News;

	constructor(private homeService: HomeService) { }

	ngOnInit() {
		const newsArray: News[] = this.homeService.getStaticNews().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		this.news = newsArray[this.newsIndex];
	}

}
