import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Componente de navegación principal (navbar) de la aplicación.
 * 
 * Este componente muestra enlaces de navegación dinámicos basados en las rutas
 * definidas en el archivo `app.routes.ts`, y también refleja el título de la página
 * actual en base a la URL activa.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  /**
   * Inyección del servicio de enrutamiento de Angular.
   * Permite acceder al historial de navegación, eventos, rutas activas, etc.
   * 
   * @see https://angular.io/api/router/Router
   */
  router = inject(Router);

  /**
   * Rutas visibles en el navbar.
   * 
   * Se construye a partir del array `routes` importado, extrayendo la ruta (`path`)
   * y el título (`title`) de cada una, con un valor por defecto si no hay título definido.
   * Se excluye la ruta `**` (wildcard) ya que no representa una vista navegable directa.
   * 
   * @example
   * [
   *   { path: 'fullscreen', title: 'Fullscreen Map' },
   *   { path: 'markers', title: 'Marcadores' }
   * ]
   */
  routes = routes
    .map((route) => ({
      path: route.path,
      title: `${route.title ?? 'Mapas en Angular'}`,
    }))
    .filter((route) => route.path !== '**');

  /**
   * Observable que emite el título correspondiente a la ruta actual del navegador.
   * 
   * Se basa en la emisión del evento `NavigationEnd` del router,
   * y luego compara la URL navegada con las rutas disponibles para obtener el `title`.
   * Es útil para usar en la plantilla con `async` pipe.
   * 
   * @example
   * pageTitle$ | async → "Marcadores"
   */
  pageTitle$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event.url),
    map((url) => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas')
  );


}
