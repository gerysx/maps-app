import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { DecimalPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styles:  [`
    div {
      width: 100vw;
      height: calc(100vh - 64px); /* ajusta esto si tienes navbar u otro layout */
    }
    #controls{
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `]
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map| null>(null)

  zoom = signal(2)
  
  zoomEffect = effect(() => {
  const map = this.map();
  if (!map) return;

  map.setZoom(this.zoom());
});


  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve,80)); 

    const element = this.divElement()!.nativeElement;
    console.log(element);

    const map = new mapboxgl.Map({
      container: element , // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-3.7038, 40.4168], //  Madrid, España
      zoom: this.zoom() // starting zoom
    });
    this.mapListeners(map)
  }
  
  mapListeners ( map: mapboxgl.Map){
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom()
      this.zoom.set(newZoom)
    })

    this.map.set(map)
    
  }
}

