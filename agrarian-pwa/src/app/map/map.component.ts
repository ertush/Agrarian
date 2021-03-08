import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

/*
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
*/

import * as L from 'leaflet';

import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-map',
  template: `
      <div class="k-card">
        <h2 class="k-card-header text-center m-0">Device Location</h2>
        <div class="row">
            <div *ngIf="!isReady" style="height: 400px">
                <app-loading-spinner>
                </app-loading-spinner>
            </div>
          <div #map id="map" class="ol-map"></div>
           <!-- tabStrip menu -->
           <div  *ngIf="isMobile" class="tabStripMenu text-center">
                <kendo-dropdownlist class="dropDownlist" [data]="tabItems" [defaultItem]="defaultTab" (valueChange)="onSelect($event)">
                </kendo-dropdownlist>
            </div>
            <!-- End of tabStrip menu -->
          </div>

      </div>
  `,
  styles: [
    `
    .ol-map{
    height: 400px;
    width: 100%;
    margin: 2rem;
    border-radius: .5rem;
    }

    `
  ]
})

export class MapComponent implements OnInit, AfterViewInit {

  @Input() public isReady: boolean;
  @Input() public lat: number;
  @Input() public lng: number;
  @Output() public dropDownSelect = new EventEmitter<string>();

  @ViewChild('map') private mapElem: ElementRef<HTMLElement>;

  public map: L.Map;
  public isMobile: boolean;
  public tabItems: Array<string> = ['Graph', 'Weather'];
  public defaultTab = 'Map';

  constructor(private deviceService: DeviceDetectorService) {

  }

  ngAfterViewInit(): void {
    this.map =  L.map(this.mapElem.nativeElement).setView([this.lat, this.lng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const mapIcon = L.icon({
      iconUrl: '../../assets/marker.png',
      iconAnchor: [0, -10]
  });

    L.marker([this.lat, this.lng], {icon: mapIcon}).addTo(this.map)
    .bindPopup('AG-11 location.')
    .openPopup();

    this.map.on('click', val => console.log({val}));

  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

  public onSelect(value: string) {
    this.dropDownSelect.emit(value);
}

}
