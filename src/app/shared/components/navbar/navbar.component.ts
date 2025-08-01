/**
 * Componente de navegación principal (navbar) de la aplicación.
 *
 * Este componente renderiza un panel superior con el título de la ruta actual
 * y un menú lateral con navegación basada en las rutas declaradas en `app.routes.ts`.
 *
 * También gestiona el estado reactivo del sidebar y actualiza dinámicamente el título según la ruta activa.
 *
 * @component
 * @selector app-navbar
 * @standalone
 * @template ./navbar.component.html
 * @imports RouterLink, RouterLinkActive, AsyncPipe
 *
 * @example
 * <app-navbar></app-navbar>
 *
 * @remarks
 * Este componente está diseñado para funcionar con Angular 20 y el sistema de señales.
 */

import { Component, inject, signal } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  /**
   * Instancia del servicio `Router` de Angular.
   *
   * Se utiliza para escuchar eventos de navegación (`NavigationEnd`) y acceder a la URL actual.
   *
   * @readonly
   * @type {Router}
   * @see https://angular.io/api/router/Router
   */
  readonly router = inject(Router);

  /**
   * Estado reactivo que controla si el menú lateral (sidebar) está abierto o cerrado.
   *
   * @signal
   * @type {Signal<boolean>}
   * @default false
   */
  readonly sidebarOpen = signal(false);

  /**
   * Alterna el estado del menú lateral (`sidebarOpen`) entre abierto y cerrado.
   *
   * @method
   */
  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }

  /**
   * Lista de rutas visibles en el menú de navegación.
   *
   * Se genera a partir de las rutas del archivo `app.routes.ts`, extrayendo solo aquellas
   * que tienen un `path` definido (y distinto de '**') y un `title` asignado.
   *
   * @readonly
   * @type {Array<{ path: string; title: string }>}
   *
   * @example
   * [
   *   { path: 'fullscreen', title: 'Explora el mundo' },
   *   { path: 'markers', title: 'Marcadores' },
   * ]
   */
  readonly routes = routes
    .map((route) => ({
      path: route.path,
      title: `${route.title ?? 'Mapas en Angular'}`,
    }))
    .filter((route) => route.path !== '**');

  /**
   * Título de la página actual basado en la ruta activa.
   *
   * Este observable escucha los eventos de navegación (`NavigationEnd`) y compara la URL
   * con las rutas registradas para obtener el título correspondiente.
   * Puede usarse en el HTML con el pipe `async`.
   *
   * @readonly
   * @type {Observable<string>}
   *
   * @example
   * {{ pageTitle$ | async }} → "Sitios turísticos"
   */
  readonly pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => (event as NavigationEnd).url),
    map(url => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas')
  );
}
