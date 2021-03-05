export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Home',
					root: true,
					alignment: 'left',
					page: '/home'
// translate: 'MENU.HOME'
				},
				{
					title: 'Produkte',
					root: true,
					alignment: 'left',
					submenu: [
						{
							title: 'nach Kategorien',
							page: '/products/categories'
						},
						{
							title: 'alle Produkte',
							page: '/products/allproducts'
						}
					]
				},
				{
					title: 'Admin',
					root: true,
					alignment: 'left',
					submenu: [
						{
							title: 'Lieferanten',
							page: '/admin/suppliers',
							onlyForRole: 'ADMIN'
						},
						{
							title: 'Produkte',
							page: '/admin/adminproducts',
							onlyForRole: 'SUPPLIER'
						}
						,
						{
							title: 'Benutzer',
							page: '/admin/users',
							onlyForRole: 'ADMIN'
						}
					]
				}
/*				{
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
							title: 'Kategorien als Karten',
							page: '/cardlayout'
						}
					]
				}*/
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
