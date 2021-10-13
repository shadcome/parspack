import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IUser } from 'src/app/interfaces';

var icon = new L.Icon({
  iconUrl: 'leaflet/marker-icon.png',
  iconRetinaUrl: 'leaflet/marker-icon-2x.png',
  shadowUrl: 'leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

@Component({
  selector: 'scome-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  map: L.Map | null = null;
  @Input() user: IUser | null = null

  ngAfterViewInit(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }

    if (this.user) {
      const tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 25 });
      this.map = L.map('map', {
        center: [+this.user.address.geo.lat, +this.user.address.geo.lat],
        zoom: 5,
        maxZoom: 19,
        attributionControl: false,
        layers: [tile]
      });
      L.marker([+this.user.address.geo.lat, +this.user.address.geo.lat])
        .setIcon(icon)
        .addTo(this.map);
    }
  }


  ngOnDestroy(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }

}
