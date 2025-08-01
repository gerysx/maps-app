import { Component, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { MiniMapComponent } from '../../maps/components/mini-map/mini-map.component';

/**
 * Interfaz que representa un punto de interés turístico.
 * 
 * @property id - Identificador único (UUID).
 * @property name - Nombre del lugar turístico.
 * @property description - Descripción breve del sitio.
 * @property continent - Continente al que pertenece el lugar.
 * @property lngLat - Coordenadas geográficas (longitud y latitud).
 * @property tags - Lista de etiquetas temáticas o geográficas.
 */
interface TouristPlace {
  id: string;
  name: string;
  description: string;
  continent: 'Europa' | 'Asia' | 'África' | 'América' | 'Oceanía';
  lngLat: { lng: number; lat: number };
  tags: string[];
}

/**
 * Componente principal de la vista de lugares turísticos.
 *
 * Este componente muestra una lista de puntos turísticos organizados por continente.
 * Cada tarjeta incluye un mapa en miniatura (`MiniMapComponent`) y detalles del lugar.
 *
 * @example Uso del componente en rutas:
 * {
 *   path: 'houses',
 *   component: HousesPageComponent,
 *   title: 'Sitios turísticos'
 * }
 */
@Component({
  selector: 'app-page-component',
  standalone: true,
  imports: [MiniMapComponent],
  templateUrl: './houses-page.component.html',
})
export class HousesPageComponent {
  /**
   * Estado reactivo que contiene la lista de lugares turísticos.
   * 
   * Inicializado con una colección diversa de monumentos y sitios
   * representativos de los cinco continentes.
   * 
   * Utiliza `uuid` para asignar identificadores únicos.
   */
  houses = signal<TouristPlace[]>([
    //  EUROPA
    {
      id: uuid(),
      name: 'Torre Eiffel',
      description: 'Emblemática torre de hierro en el corazón de París.',
      continent: 'Europa',
      lngLat: { lng: 2.2945, lat: 48.8584 },
      tags: ['París', 'Francia', 'Monumento'],
    },
    {
      id: uuid(),
      name: 'Coliseo Romano',
      description: 'Anfiteatro icónico de la Antigua Roma.',
      continent: 'Europa',
      lngLat: { lng: 12.4922, lat: 41.8902 },
      tags: ['Italia', 'Historia', 'Roma'],
    },
    {
      id: uuid(),
      name: 'Castillo de Neuschwanstein',
      description: 'Castillo de cuento de hadas en los Alpes bávaros que inspiró a Disney.',
      continent: 'Europa',
      lngLat: { lng: 10.7498, lat: 47.5576 },
      tags: ['Alemania', 'Castillo', 'Baviera'],
    },

    //  AMÉRICA
    {
      id: uuid(),
      name: 'Machu Picchu',
      description: 'Ciudadela inca escondida en los Andes peruanos.',
      continent: 'América',
      lngLat: { lng: -72.544963, lat: -13.163141 },
      tags: ['Perú', 'Incas', 'Montaña'],
    },
    {
      id: uuid(),
      name: 'Estatua de la Libertad',
      description: 'Símbolo de libertad en Nueva York.',
      continent: 'América',
      lngLat: { lng: -74.0445, lat: 40.6892 },
      tags: ['EEUU', 'NYC', 'Icono'],
    },

    //  ASIA
    {
      id: uuid(),
      name: 'Gran Muralla China',
      description: 'Estructura militar de miles de kilómetros.',
      continent: 'Asia',
      lngLat: { lng: 117.236, lat: 40.6769 },
      tags: ['China', 'Muralla', 'Historia'],
    },
    {
      id: uuid(),
      name: 'Templo de Angkor Wat',
      description: 'Templo monumental en Camboya.',
      continent: 'Asia',
      lngLat: { lng: 103.866986, lat: 13.4125 },
      tags: ['Camboya', 'Religión', 'Arquitectura'],
    },
    {
      id: uuid(),
      name: 'Taj Mahal',
      description: 'Mausoleo de mármol blanco símbolo del amor eterno, ubicado en Agra.',
      continent: 'Asia',
      lngLat: { lng: 78.0421, lat: 27.1751 },
      tags: ['India', 'Patrimonio', 'Arquitectura'],
    },

    //  ÁFRICA
    {
      id: uuid(),
      name: 'Pirámides de Giza',
      description: 'Maravilla del mundo antiguo en Egipto.',
      continent: 'África',
      lngLat: { lng: 31.1342, lat: 29.9792 },
      tags: ['Egipto', 'Faraones', 'Antigüedad'],
    },
    {
      id: uuid(),
      name: 'Cataratas Victoria',
      description: 'Impresionantes cataratas entre Zambia y Zimbabue.',
      continent: 'África',
      lngLat: { lng: 25.8572, lat: -17.9243 },
      tags: ['Naturaleza', 'África', 'Zambeze'],
    },

    //  OCEANÍA
    {
      id: uuid(),
      name: 'Ópera de Sídney',
      description: 'Edificio icónico a orillas del puerto.',
      continent: 'Oceanía',
      lngLat: { lng: 151.2153, lat: -33.8568 },
      tags: ['Australia', 'Arquitectura', 'Sídney'],
    },
    {
      id: uuid(),
      name: 'Uluru (Ayers Rock)',
      description: 'Monolito sagrado de los aborígenes australianos en pleno desierto rojo.',
      continent: 'Oceanía',
      lngLat: { lng: 131.0369, lat: -25.3444 },
      tags: ['Australia', 'Naturaleza', 'Cultura aborigen'],
    },
  ]);
}
