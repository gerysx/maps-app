/**
 * Componente de página a pantalla completa con mapa interactivo (Mapbox GL).
 *
 * Este componente muestra un mapa de Mapbox en modo fullscreen,
 * con controles de navegación, zoom, escala y geolocalización.
 * Además, mantiene sincronizado el nivel de zoom y las coordenadas actuales mediante señales de Angular 20.
 *
 * @component
 * @selector app-fullscreen-map-page
 * @template ./fullscreen-map-page.component.html
 * @style Inline CSS para controlar layout y paneles.
 *
 * @example
 * <app-fullscreen-map-page></app-fullscreen-map-page>
 *
 * @remarks
 * - Usa la API `viewChild` para referenciar el contenedor del mapa.
 * - Se apoya en `signal` y `effect` para actualizar el zoom del mapa en tiempo real.
 * - El `mapboxgl.accessToken` se obtiene desde los entornos en `environment.mapboxkey`.
 */

import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

// Configuración del token de acceso a Mapbox
mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styles: [
    `
      /* Estilos básicos para mapa a pantalla completa */
      div {
        width: 100vw;
        height: calc(100vh - 64px); /* Ajusta si hay navbar u otro header */
      }
      #controls {
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
    `,
  ],
})
export class FullscreenMapPageComponent implements AfterViewInit {
  /**
   * Referencia al elemento contenedor del mapa.
   *
   * @viewChild
   */
  readonly divElement = viewChild<ElementRef>('map');

  /**
   * Señal que contiene la instancia actual de `mapboxgl.Map`.
   *
   * @default null
   */
  readonly map = signal<mapboxgl.Map | null>(null);

  /**
   * Señal que representa el nivel de zoom actual del mapa.
   *
   * @default 2
   */
  readonly zoom = signal(2);

  /**
   * Señal que almacena las coordenadas (longitud y latitud) del centro del mapa.
   *
   * @default { lng: -3.7038, lat: 40.4168 } (Madrid)
   */
  readonly coordinates = signal({
    lng: -3.7038,
    lat: 40.4168,
  });

  /**
   * Efecto que reacciona a cambios en la señal `zoom`.
   * Aplica el nuevo zoom al mapa de Mapbox.
   */
  readonly zoomEffect = effect(() => {
    const map = this.map();
    if (!map) return;

    map.setZoom(this.zoom());
  });

  /**
   * Ciclo de vida `ngAfterViewInit`.
   *
   * Inicializa el mapa una vez el componente está cargado
   * y referencia el elemento `div` para montar el mapa de Mapbox GL.
   */
  async ngAfterViewInit(): Promise<void> {
    if (!this.divElement()?.nativeElement) return;

    // Espera breve para evitar problemas de renderizado
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    const { lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: this.zoom(),
    });

    this.mapListeners(map);
  }

  /**
   * Configura los listeners y controles del mapa.
   *
   * @param map - Instancia de `mapboxgl.Map` ya inicializada.
   *
   * @remarks
   * - Actualiza la señal `zoom` cuando se hace zoom.
   * - Actualiza las coordenadas (`coordinates`) al mover el mapa.
   * - Añade controles de fullscreen, navegación, escala y geolocalización.
   */
  private mapListeners(map: mapboxgl.Map): void {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.on('load', () => {
      console.log('Map loaded');
    });

    // Controles adicionales
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    this.map.set(map);
  }
}
