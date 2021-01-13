import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	zoom = 15;
	latitude = 46.56984561550568;
  longitude = 11.566038655947285;

  constructor() { }

  ngOnInit(): void {
  }

}
