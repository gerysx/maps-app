/**
 * Archivo de rutas principales de la aplicación Angular.
 *
 * Define las rutas accesibles dentro del proyecto, cada una asociada a un componente de página.
 * Utiliza la configuración moderna de rutas con componentes standalone en Angular 17+.
 *
 * @remarks
 * Este archivo es usado en `app.config.ts` dentro de `provideRouter(routes)` para configurar el enrutador global.
 *
 * @see https://angular.io/api/router/Routes
 */

import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

/**
 * Rutas principales de la aplicación.
 *
 * Cada entrada del array representa una ruta asociada a un componente de tipo página.
 * Incluye títulos que pueden usarse para actualizar el título del documento dinámicamente.
 *
 * @property path - Ruta en la URL.
 * @property component - Componente standalone que se renderiza.
 * @property title - Título opcional para el navegador/documento.
 * @property redirectTo - Redirección por defecto en caso de ruta desconocida.
 */
export const routes: Routes = [
  {
    /** Página de mapa en pantalla completa */
    path: 'fullscreen',
    component: FullscreenMapPageComponent,
    title: 'Explora el mundo',
  },
  {
    /** Página de gestión de marcadores personalizados */
    path: 'markers',
    component: MarkersPageComponent,
    title: 'Marcadores',
  },
  {
    /** Página de visualización de casas o puntos turísticos */
    path: 'houses',
    component: HousesPageComponent,
    title: 'Sitios turísticos',
  },
  {
    /**
     * Ruta comodín (catch-all).
     *
     * Redirige cualquier ruta no reconocida a 'fullscreen'.
     */
    path: '**',
    redirectTo: 'fullscreen',
  },
];
