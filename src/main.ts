/**
 * Punto de entrada principal de la aplicación Angular.
 *
 * Este archivo inicializa la aplicación usando `bootstrapApplication`,
 * que es la nueva forma moderna (standalone) de arrancar Angular sin módulos.
 *
 * También aplica la configuración global (`appConfig`) y registra el componente raíz (`App`).
 *
 * @remarks
 * Este arranque no usa `NgModule`, sino la API de `standalone components` introducida en Angular 14+ y reforzada en Angular 17–20.
 *
 * @see https://angular.io/guide/standalone-components
 * @see https://angular.io/api/platform-browser/bootstrapApplication
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js'; // Requerido para Angular y su detección de cambios basada en Zone.js

/**
 * Inicializa la aplicación Angular con el componente raíz `App` y la configuración `appConfig`.
 *
 * @function
 * @returns {Promise<void>} Promesa que se resuelve una vez completado el arranque.
 * @throws Imprime errores en consola si ocurre un fallo durante el arranque.
 *
 * @example
 * // Este archivo se ejecuta automáticamente al iniciar la app en el navegador:
 * bootstrapApplication(App, appConfig)
 *   .catch(err => console.error(err));
 */
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
