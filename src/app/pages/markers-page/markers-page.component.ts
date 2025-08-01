/**
 * Página interactiva de marcadores con Mapbox GL.
 *
 * Este componente permite al usuario añadir marcadores de colores aleatorios
 * haciendo clic en el mapa. También permite centrarse sobre un marcador
 * y eliminarlo desde la interfaz.
 *
 * Utiliza señales (`signal`) para almacenar el estado del mapa y de los marcadores.
 * 
 * @component
 * @selector app-markers-page
 * @template ./markers-page.component.html
 * @standalone false
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { v4 as UUIDv4 } from 'uuid';
import { DecimalPipe } from '@angular/common';

// Configuración de la clave de acceso a Mapbox
mapboxgl.accessToken = environment.mapboxkey;

/**
 * Interfaz que representa un marcador en el mapa.
 */
interface Marker {
  /** Identificador único del marcador (UUID v4) */
  id: string;

  /** Instancia del marcador de Mapbox GL */
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [DecimalPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  /**
   * Referencia al elemento DOM que contendrá el mapa.
   * Se obtiene con `@viewChild` a través del nombre `'map'`.
   */
  divElement = viewChild<ElementRef>('map');

  /**
   * Señal reactiva que contiene la instancia actual del mapa de Mapbox.
   */
  readonly map = signal<mapboxgl.Map | null>(null);

  /**
   * Lista reactiva de todos los marcadores creados por el usuario.
   */
  readonly markers = signal<Marker[]>([]);

  /**
   * Ciclo de vida `ngAfterViewInit`.
   * Se ejecuta una vez el componente y el DOM están completamente inicializados.
   *
   * Inicializa el mapa con Mapbox GL y establece los listeners.
   */
  async ngAfterViewInit(): Promise<void> {
    if (!this.divElement()?.nativeElement) return;

    // Evita errores de renderizado antes de que el DOM esté 100% listo
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-3.7038, 40.4168], // Madrid
      zoom: 14,
    });

    this.mapListeners(map);
  }

  /**
   * Añade listeners al mapa de Mapbox GL.
   *
   * @param map Instancia de `mapboxgl.Map` ya inicializada.
   */
  private mapListeners(map: mapboxgl.Map): void {
    map.on('click', (event) => this.mapClick(event));
    this.map.set(map);
  }

  /**
   * Acción ejecutada cuando el usuario hace clic en el mapa.
   *
   * Crea un marcador nuevo con color aleatorio, lo agrega al mapa y al estado reactivo.
   *
   * @param event Evento de tipo `MapMouseEvent` que contiene las coordenadas clicadas.
   */
  private mapClick(event: mapboxgl.MapMouseEvent): void {
    if (!this.map()) return;

    const map = this.map()!;
    const coords = event.lngLat;

    // Generación de color aleatorio hex
    const color = '#xxxxxx'.replace(/x/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({ color })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker,
    };

    this.markers.update((markers) => [newMarker, ...markers]);
  }

  /**
   * Centra la vista del mapa sobre un marcador dado.
   *
   * @param lngLat Coordenadas `LngLatLike` del marcador.
   */
  flyToMarker(lngLat: LngLatLike): void {
    if (!this.map()) return;

    this.map()!.flyTo({ center: lngLat });
  }

  /**
   * Elimina un marcador del mapa y del estado reactivo.
   *
   * @param marker El marcador a eliminar.
   */
  deleteMarker(marker: Marker): void {
    if (!this.map()) return;

    marker.mapboxMarker.remove();

    this.markers.set(
      this.markers().filter((m) => m.id !== marker.id)
    );
  }
}
