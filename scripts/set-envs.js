const { writeFileSync, mkdirSync, existsSync } = require('fs');
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapboxkey = process.env['MAPBOX_KEY'];

if (!mapboxkey) {
  throw new Error('MAPBOX_KEY is not set in .env');
}

// Contenido del archivo .ts que Angular espera
const envFileContent = `
export const environment = {
  mapboxkey: "${mapboxkey}"
};
`;

// Asegurar que la carpeta exista
if (!existsSync('./src/environments')) {
  mkdirSync('./src/environments');
}

// Escribir el archivo para producción y desarrollo
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);

console.log(' Environment files generated.');
