import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

// Configura el token de acceso de Mapbox
mapboxgl.accessToken = environment.mapboxkey;

/**
 * Componente de mapa reducido (miniatura) que muestra una ubicación geográfica con marcador.
 *
 * Este componente es útil para representar puntos de interés embebidos (por ejemplo,
 * tarjetas de propiedades o monumentos) y se inicializa con un `center` (`lngLat`)
 * y un `zoom` opcional.
 *
 * Requiere la API de Mapbox GL JS.
 */
@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [],
  templateUrl: './mini-map.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 260px;
      }
    `,
  ],
})
export class MiniMapComponent implements AfterViewInit {
  /**
   * Elemento HTML del contenedor del mapa (div), accedido mediante `@viewChild`.
   */
  divElement = viewChild<ElementRef>('map');

  /**
   * Coordenadas geográficas requeridas para centrar el mapa.
   * 
   * @example
   * { lng: 2.2945, lat: 48.8584 } // Torre Eiffel
   */
  lngLat = input.required<{ lng: number; lat: number }>();

  /**
   * Nivel de zoom inicial del mapa.
   * Por defecto es 9 si no se especifica.
   *
   * @default 9
   */
  zoom = input<number>(8);

  /**
   * Hook del ciclo de vida que se ejecuta tras la inicialización de la vista.
   * Aquí se instancia el mapa y se añade un marcador centrado en `lngLat`.
   */
  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    // Breve retraso para asegurar que el contenedor esté completamente renderizado
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false, // Puede ponerse en false si se desea solo vista estática
      pitch: 30, // Inclinación para dar efecto de profundidad
    });

    // Añade un marcador en el centro especificado
    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
