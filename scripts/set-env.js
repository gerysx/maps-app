// scripts/set-env.ts
import { writeFileSync } from 'fs';

const mapboxToken = process.env.MAPBOX_TOKEN;
const content = `
export const environment = {
  production: true,
  mapboxToken: '${mapboxToken}'
};
`;

writeFileSync('./src/environments/environment.prod.ts', content);
console.log('✅ environment.prod.ts generado correctamente.');
