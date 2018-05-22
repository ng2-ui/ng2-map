import {Component} from '@angular/core';
import {SourceCodeService} from '../services/source-code.service';
import {MapListenerService} from '../services/map-listener.service';

@Component({
  template: `
    <h1>Map Change Multiple Properties</h1>
    <ngui-map
      [center]="mapProps.center"
      [zoom]="mapProps.zoom"
      (idle)="onIdle($event)"
      [geoFallbackCenter]="[42.99, -77.79]"
      (mapReady)="mls.mapReady($event)"></ngui-map>
    <div id="center-zoom"> center: {{mapInfo.center}}, zoom: {{mapInfo.zoom}}</div>
    <button id="change-props"
            (click)="mapProps = {center: 'New York', zoom: 8}">
      Change Multiple Map Props
    </button>

    <button (click)="sc.plnkr(code)">See in plunker</button>

    <pre class="prettyprint">{{code}}</pre>
  `
})
export class MapChangeMultiplePropertiesComponent {
  mapProps: any = {
    center: 'some-invalid-location',
    zoom: 11
  };
  mapInfo: any = {};
  code: string;

  constructor(public sc: SourceCodeService, public mls: MapListenerService) {
    sc.getText('MapChangeMultiplePropertiesComponent').subscribe(text => this.code = text);
  }

  onIdle(event) {
    let map = event.target;
    if (!map.getCenter())
      return;

    this.mapInfo.center = [map.getCenter().lat(), map.getCenter().lng()];
    this.mapInfo.zoom = map.getZoom();
  }
}
