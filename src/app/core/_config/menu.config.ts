export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Produkte',
					root: true,
					alignment: 'left',
					page: '/products',
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
