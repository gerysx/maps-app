# Maps App

Aplicación desarrollada en **Angular 20** usando **standalone components**, **signals**, **directivas estructurales modernas (`@for`, `@if`)**, **Tailwind CSS**, **DaisyUI** y **MapboxGL** para mostrar mapas interactivos, marcadores personalizados y puntos turísticos.

**Iniciar el proyecto en 'dev'**

1. Clonar el repositorio
2. Instalar dependencias
```pnpm install```
3. Genera tus variables de entorno:
MAPBOX_TOKEN=pk.xxxxxx
4. Ejecutar el comando de creacion de variables de entorno:
 ```npm run set-env.js```
5. Ejecuta el pryecto:
```pnpm start```

**Estructura del proyecto**

src/
├── app/
│   ├── pages/               # Vistas principales (fullscreen, markers, houses)
│   ├── shared/
│   │   └── components/      # Componentes reutilizables como navbar y mini-map
│   ├── app.routes.ts        # Rutas con título dinámico
│   ├── app.config.ts        # Providers (router, zone detection...)
│   └── app.ts               # Componente raíz standalone
├── environments/            # Claves de entorno (mapboxKey, etc.)
└── main.ts  

**Comandos útiles**


Comando	-------------------Descripción
```pnpm start```	Ejecuta la app en modo desarrollo (ng serve)
```pnpm run docs```	Genera documentación con Compodoc
```pnpm exec compodoc``` -s	Sirve la documentación en http://localhost:8080
```pnpm run set-envs```	Inyecta variables de entorno

**GERMÁN ALVAREZ**
