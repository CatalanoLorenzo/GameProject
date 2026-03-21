import { readFile, writeFile } from 'fs/promises';//libreria per lettura e scrittura file utilizzata per il file JSON
const JSON_MAP_PATH = './src/data/test1.json'; // recupero percorso relativo file JSON
let mapJSONCache = null;//variabile che conterà in memoria  la mappa di gioco evitando cosi di accedere continuamente al file 

/**loadWorld metodo per caricare nella varibile mapJSONCache tutto il file JSON
 * @returns 
 */
export async function loadWorld() {
  if (!mapJSONCache) {
    const data = await readFile(WORLD_PATH, 'utf-8');
    mapJSONCache = JSON.parse(data);
  }
  return mapJSONCache;
}
/**saveWorld metodo che permette di riversare nel file JSON la versione attualmente in memoria della mappa di gioco
 * 
 * @returns 
 */
export async function saveWorld() {
  if (!worldCache) return;
  await writeFile(WORLD_PATH, JSON.stringify(worldCache, null, 2));
}