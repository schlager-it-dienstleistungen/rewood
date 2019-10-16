export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Produkte',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'Produkte mit Filter',
							page: '/productswithfilter'
						},
						{
							title: 'Produkte mit Suche',
							page: '/productswithsearch'
						},
						{
							title: 'Produkte als Karten',
							page: '/productcards'
						},
						{
							title: 'Cardlayout',
							page: '/cardlayout'
						}
					]
				}
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
