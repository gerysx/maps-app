/**
 * Configuración principal de la aplicación Angular.
 *
 * Este archivo exporta una constante `appConfig` que define los proveedores globales necesarios
 * para el correcto funcionamiento de la app, incluyendo enrutamiento y gestión del ciclo de detección de cambios.
 *
 * Se utiliza en `main.ts` al arrancar la aplicación con `bootstrapApplication(App, appConfig)`.
 *
 * @see https://angular.io/api/core/ApplicationConfig
 * @see https://angular.io/api/platform-browser/bootstrapApplication
 */

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * Objeto de configuración de la aplicación Angular.
 *
 * Define los proveedores globales que Angular usará en el arranque.
 *
 * @property {Provider[]} providers - Lista de providers que se inyectan a nivel raíz.
 * 
 * Incluye:
 * - `provideZoneChangeDetection`: habilita la detección de cambios basada en Zones con optimización (`eventCoalescing`).
 * - `provideRouter(routes)`: configura el sistema de enrutamiento de la app con las rutas definidas en `app.routes.ts`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Proveedor que activa la detección de cambios con zone.js y mejora el rendimiento
     * agrupando eventos asincrónicos (`eventCoalescing: true`).
     *
     * @see https://angular.io/api/core/provideZoneChangeDetection
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Proveedor del router de Angular que usa las rutas definidas en `app.routes.ts`.
     *
     * @see https://angular.io/api/router/provideRouter
     */
    provideRouter(routes),

    // Puedes activar esto si decides usar Angular sin Zone.js:
    // provideZonelessChangeDetection()
  ],
};
