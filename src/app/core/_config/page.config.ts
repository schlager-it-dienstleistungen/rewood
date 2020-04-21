export class PageConfig {
	public defaults: any = {
		home: {
			page: {
				title: 'Home',
				desc: 'Latest updates and News'
			},
		},
		products: {
			page: {
				title: 'Produkte',
				desc: 'Actual Products'
			}
		},
		admin: {
			createSupplier: {page: {title: 'Neuer Lieferant', desc: ''}},
			createProduct: {page: {title: 'Neues Produkt', desc: ''}},
		},
		/*products: {
			products: {
				page: {
					title: 'Produkte mit Filter',
					desc: 'Aktuelle Produkte'
				}
			},
			productswithsearch: {
				page: {
					title: 'Produkte mit Suche',
					desc: 'Aktuelle Produkte'
				}
			},
			productcards: {
				page: {
					title: 'Produkte als Karten',
					desc: 'Aktuelle Produkte'
				}
			},
			cardlayout: {
				page: {
					title: 'Kategorien',
					desc: ''
				}
			}
		},*/

		'user-management': {
			users: {
				page: {title: 'Users', desc: ''}
			},
			roles: {
				page: {title: 'Roles', desc: ''}
			}
		},
		builder: {
			page: {title: 'Layout Builder', desc: ''}
		},
		profile: {
			page: {title: 'User Profile', desc: ''}
		},
		error: {
			404: {
				page: {title: '404 Not Found', desc: '', subheader: false}
			},
			403: {
				page: {title: '403 Access Forbidden', desc: '', subheader: false}
			}
		},
		wizard: {
			'wizard-1': {page: {title: 'Wizard 1', desc: ''}},
			'wizard-2': {page: {title: 'Wizard 2', desc: ''}},
			'wizard-3': {page: {title: 'Wizard 3', desc: ''}},
			'wizard-4': {page: {title: 'Wizard 4', desc: ''}},
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
