export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Home',
					root: true,
					alignment: 'left',
					page: '/home',
					translate: 'MENU.HOME'
				},
				{
					title: 'Produkte',
					root: true,
					alignment: 'left',
					translate: 'MENU.PRODUCTS',
					submenu: [
						{
							title: 'nach Kategorien',
							page: '/products/categories',
							translate: 'MENU.PRODUCTS_BYCATEGORIE',
						},
						{
							title: 'alle Produkte',
							page: '/products/allproducts',
							translate: 'MENU.PRODUCTS_ALL',
						}
					]
				},
				{
					title: 'Admin',
					root: true,
					alignment: 'left',
					translate: 'MENU.ADMIN',
					submenu: [
						{
							title: 'Lieferanten',
							page: '/admin/suppliers',
							translate: 'MENU.ADMIN_SUPPLIERS',
							onlyForRole: 'ADMIN'
						},
						{
							title: 'Produkte',
							page: '/admin/adminproducts',
							translate: 'MENU.ADMIN_PRODUCTS',
							onlyForRole: 'SUPPLIER'
						}
						,
						{
							title: 'Benutzer',
							page: '/admin/users',
							translate: 'MENU.ADMIN_USERS',
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
