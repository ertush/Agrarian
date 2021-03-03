import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
             <!-- tabStrip menu -->
             <div  *ngIf="isMobile" class="tabStripMenu text-center">
                <kendo-dropdownlist [data]="tabItems" [defaultItem]="defaultTab" (valueChange)="onSelect($event)">
                </kendo-dropdownlist>
            </div>
            <!-- End of tabStrip menu -->
          <div id="map" class="ol-map"></div>
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

export class MapComponent implements OnInit {

  @Input() public isReady: boolean;
  @Input() public lat: number;
  @Input() public lng: number;
  @Output() public dropDownSelect = new EventEmitter<string>();
  
  public map: Map;
  public isMobile: boolean;
  public tabItems: Array<string> = ['Graph'];
  public defaultTab = 'Map';

  constructor(private deviceService: DeviceDetectorService) {

  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([this.lat, this.lng]),
        zoom: 10
      })
    });
    this.addPoint(this.lat, this.lng);
    this.setCenter();

    this.map.on('pointermove', evt => {
      console.log(evt.coordinate);
    });
  }

  public onSelect(value: string) {
    this.dropDownSelect.emit(value);
}

  setCenter() {
    const view = this.map.getView();
    view.setCenter(olProj.fromLonLat([this.lat, this.lng]));
    view.setZoom(10);
  }

  addPoint(lat: number, lng: number) {
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [new Feature({
           geometry: new Point(olProj.transform([lat, lng], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'assets/marker.png'
        })
      })
    });
    this.map.addLayer(vectorLayer);
    }

}
