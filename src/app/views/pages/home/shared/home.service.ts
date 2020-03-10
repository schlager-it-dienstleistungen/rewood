import { Injectable } from '@angular/core';
import { News } from './news';

@Injectable({
	providedIn: 'root'
})
export class HomeService {

	constructor() { }

	getStaticNews(): News[] {
		return [
			{
				title: 'Holzbau ist aktiver Beitrag gegen die Klimakrise',
				text: 'Die positiven Eigenschaften vom Roh- und Baustoff Holz sind auch dem österreichischen Bundespräsidenten bekannt: Im Rahmen der UN-Klimakonferenz besuchte Bundespräsident Alexander Van der Bellen die Holz-Leichtathletikhalle Polideportivo Gallur. Die Sporthalle wurde durch das österreichische Vorzeigeunternehmen für Holzbau – WIEHAG – konstruiert und ist nur eines von vielen internationalen Leuchtturmprojekten aus dem Alpenland. „Wir müssen jetzt aktiv werden. Wir müssen jetzt die Klimakrise bekämpfen. Der Einsatz von nachhaltigen Baustoffen wie Holz kann hier auch einen Beitrag leisten“, so Bundespräsident Alexander Van der Bellen beim Besuch einer österreichischen Holzhalle in Madrid. „Es freut uns sehr, dass durch den Besuch von Bundespräsident Alexander Van der Bellen der Holzbau den Stellenwert erreicht, den er durch seine klimafreundlichen Eigenschaften verdient“, so Dr. Erich Wiesner, Obmann des Fachverbandes der Holzindustrie Österreichs sowie Geschäftsführer und Eigentümer des Ingenieurholzbauspezialisten WIEHAG mit Sitz in Altheim/Oberösterreich. „Der Baustoff Holz trägt als Naturprodukt und mit seiner Funktion als Kohlenstoffspeicher positiv zum Klima bei“, ergänzt Wiesner.',
				date: new Date('Mon Mar 09 2020 07:44:57'),
				link: 'https://www.wko.at/branchen/industrie/holzindustrie/holzbau-ist-aktiver-beitrag-gegen-die-klimakrise.html'
			},
			{
				title: 'Coronavirus: Wirtschaftskammer als Anlaufstelle für Unternehmen',
				text: 'Die Wirtschaftskammer Österreich hat eine zentrale Ansprechstelle für Unternehmen eingerichtet: Im Coronavirus Infopoint laufen sämtliche Informationen aus dem In- und Ausland zu diesem Thema zusammen. Rufen Sie uns unter 0590900-4352 an oder schreiben Sie an',
				date: new Date('Fri Mar 06 2020 17:44:57')//,
				//link: 'https://www.wko.at/service/aussenwirtschaft/coronavirus-wirtschaftskammer-als-anlaufstelle.html'
			},
			{
				title: 'Ganz alter Bericht',
				text: 'sollte nicht mehr angezeigt werden',
				date: new Date('Fri Dec 08 2019 07:44:57')
			},
			{
				title: 'EU-Datenschutz-Grundverordnung (DSGVO)',
				text: 'Am 4. Mai 2016 wurde die „Verordnung (EU) 2016/679 des Europäischen Parlaments und des Rates vom 27. April 2016 zum Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten, zum freien Datenverkehr und zur Aufhebung der Richtlinie 95/46/EG (Datenschutz-Grundverordnung)“ kundgemacht. \n\n Die Datenschutz-Grundverordnung ist am 25. Mai 2018 in Geltung getreten. Alle Datenverarbeitungen müssen dieser Rechtslage entsprechen.',
				date: new Date('Wed Mar 04 2020 10:44:57'),
				link: 'https://www.wko.at/service/wirtschaftsrecht-gewerberecht/EU-Datenschutz-Grundverordnung.html'
			}
		];
	}
}
