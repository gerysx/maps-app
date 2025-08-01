/**
 * Componente raíz de la aplicación (`AppComponent`).
 *
 * Este componente actúa como contenedor principal de toda la aplicación Angular.
 * Se encarga de mostrar el `NavbarComponent` y renderizar el contenido dinámico de rutas mediante `RouterOutlet`.
 *
 * @component
 * @selector app-root
 * @template ./app.html
 * @style ./app.css
 * @imports
 * - `RouterOutlet` para gestionar las rutas de Angular de forma dinámica.
 * - `NavbarComponent` como barra de navegación persistente.
 *
 * @example
 * <app-root></app-root>
 *
 * @remarks
 * Este componente es inicializado en `main.ts` mediante `bootstrapApplication()`.
 * Usa señales de Angular 20 para mantener el estado local (`title`), aunque en este caso no se expone al template.
 */

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /**
   * Título de la aplicación.
   *
   * Este valor es una señal reactiva (`signal`) que contiene el nombre base de la app.
   * Aunque actualmente no se utiliza en el template, puede usarse en el futuro
   * para renderizar dinámicamente el título de la pestaña, encabezados, etc.
   *
   * @readonly
   * @type {Signal<string>}
   * @default 'maps-app'
   */
  protected readonly title = signal('maps-app');
}
