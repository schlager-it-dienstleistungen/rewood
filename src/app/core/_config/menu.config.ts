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
