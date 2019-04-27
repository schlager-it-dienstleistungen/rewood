// Angular
import { Injectable } from '@angular/core';
// Object-Path
import * as objectPath from 'object-path';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Layout
import { LayoutConfigModel } from '../../../core/_base/layout';

export interface ClassType {
	header: string[];
	header_mobile: string[];
	header_menu: string[];
	aside_menu: string[];
}

@Injectable()
export class HtmlClassService {
	// Public properties
	config: LayoutConfigModel;
	classes: ClassType;
	onClassesUpdated$: BehaviorSubject<ClassType>;
	// Private properties
	private loaded: string[] = [];

	/**
	 * Component constructor
	 */
	constructor() {
		this.onClassesUpdated$ = new BehaviorSubject(this.classes);
	}

	/**
	 * Build html element classes from layout config
	 * @param layoutConfig
	 */
	setConfig(layoutConfig: LayoutConfigModel) {
		this.config = layoutConfig;

		// scope list of classes
		this.classes = {
			header: [],
			header_mobile: [],
			header_menu: [],
			aside_menu: [],
		};

		// init base layout
		this.initLayout();
		this.initLoader();

		// init header and subheader menu
		this.initHeader();
		this.initSubheader();

		// init aside and aside menu
		this.initAside();

		this.initContent();

		// init footer
		this.initFooter();

		this.loadCoreStyles();

		this.onClassesUpdated$.next(this.classes);
	}

	getClasses(path?: string, toString?: boolean): ClassType | string[] | string {
		if (path) {
			const classes = objectPath.get(this.classes, path) || '';
			if (toString && Array.isArray(classes)) {
				return classes.join(' ');
			}
			return classes.toString();
		}
		return this.classes;
	}

	private initLayout() {
		if (objectPath.has(this.config, 'self.body.class')) {
			const _selfBodyClass = (objectPath.get(this.config, 'self.body.class')).toString();
			if (_selfBodyClass) {
				const bodyClasses: string[] = _selfBodyClass.split(' ');
				bodyClasses.forEach(cssClass => document.body.classList.add(cssClass));
			}
		}

		if (objectPath.has(this.config, 'self.body.background-image')) {
			document.body.style.backgroundImage = 'url("' + objectPath.get(this.config, 'self.body.background-image') + '")';
		}

		if (objectPath.has(this.config, 'self.body.background-position')) {
			document.body.style.backgroundPosition = objectPath.get(this.config, 'self.body.background-position');
		}

		if (objectPath.has(this.config, 'self.body.background-size')) {
			document.body.style.backgroundSize = objectPath.get(this.config, 'self.body.background-size');
		}

		if (objectPath.get(this.config, 'width')) {
			document.body.classList.add('kt-page--' + objectPath.get(this.config, 'width'));
		}

		// Offcanvas directions
		document.body.classList.add('kt-quick-panel--right');
		document.body.classList.add('kt-demo-panel--right');
		document.body.classList.add('kt-offcanvas-panel--right');
	}

	private initLoader() {
	}

	private initHeader() {
		// Fixed header
		if (objectPath.get(this.config, 'header.self.fixed.desktop.enabled')) {
			document.body.classList.add('kt-header--fixed');
			objectPath.push(this.classes, 'header', 'kt-header--fixed');
			document.body.classList.add('kt-header--minimize-' + objectPath.get(this.config, 'header.self.fixed.desktop.mode'));
		} else {
			document.body.classList.add('kt-header--static');
		}

		if (objectPath.get(this.config, 'header.self.fixed.mobile')) {
			document.body.classList.add('kt-header-mobile--fixed');
			objectPath.push(this.classes, 'header_mobile', 'kt-header-mobile--fixed');
		}
	}

	private initSubheader() {
		// Fixed content head
		if (objectPath.get(this.config, 'subheader.fixed')) {
			document.body.classList.add('kt-subheader--fixed');
		}

		if (objectPath.get(this.config, 'subheader.display')) {
			document.body.classList.add('kt-subheader--enabled');
		}

		if (objectPath.has(this.config, 'subheader.style')) {
			document.body.classList.add('kt-subheader--' + objectPath.get(this.config, 'subheader.style'));
		}
	}

	private initAside() {
		if (objectPath.get(this.config, 'aside.self.display') !== true) {
			return;
		}

		document.body.classList.add('kt-aside--enabled');

		if (objectPath.get(this.config, 'aside.self.skin')) {
			objectPath.push(this.classes, 'aside', 'kt-aside--skin-' + objectPath.get(this.config, 'aside.self.skin'));
			document.body.classList.add('kt-aside--skin-' + objectPath.get(this.config, 'aside.self.skin'));
			objectPath.push(this.classes, 'aside_menu', 'kt-aside-menu--skin-' + objectPath.get(this.config, 'aside.self.skin'));

			document.body.classList.add('kt-aside__brand--skin-' + objectPath.get(this.config, 'aside.self.skin'));
			objectPath.push(this.classes, 'brand', 'kt-aside__brand--skin-' + objectPath.get(this.config, 'aside.self.skin'));
		}

		// Fixed Aside
		if (objectPath.get(this.config, 'aside.self.fixed')) {
			document.body.classList.add('kt-aside--fixed');
			objectPath.push(this.classes, 'aside', 'kt-aside--fixed');
		} else {
			document.body.classList.add('kt-aside--static');
		}

		// Default fixed
		if (objectPath.get(this.config, 'aside.self.minimize.default')) {
			document.body.classList.add('kt-aside--minimize');
		}

		// Menu
		// Dropdown Submenu
		if (objectPath.get(this.config, 'aside.self.fixed') !== true && objectPath.get(this.config, 'aside.menu.dropdown')) {
			objectPath.push(this.classes, 'aside_menu', 'kt-aside-menu--dropdown');
			// enable menu dropdown
		}
	}

	private initAsideSecondary() {
		if (objectPath.get(this.config, 'aside-secondary.self.display')) {
			document.body.classList.add('kt-aside-secondary--enabled');
		}

		if (objectPath.get(this.config, 'aside-secondary.self.expanded') === true && objectPath.get(this.config, 'aside-secondary.self.layout') !== 'layout-2') {
			document.body.classList.add('kt-aside-secondary--expanded');
		}

		if (objectPath.get(this.config, 'aside-secondary.self.layout') === 'layout-3') {
			document.body.classList.add('kt-aside-secondary--static');
		}
	}

	private initContent() {
		// Fixed content head
		if (objectPath.get(this.config, 'content.head.fixed.desktop')) {
			document.body.classList.add('kt-content-head--fixed');
		}

		if (objectPath.get(this.config, 'content.head.fixed.mobile')) {
			document.body.classList.add('kt-content-head-mobile--fixed');
		}

		if (objectPath.get(this.config, 'content.head.display')) {
			document.body.classList.add('kt-content-head--enabled');
		}
	}

	private initFooter() {
	}

	private loadCoreStyles() {
	}
}
