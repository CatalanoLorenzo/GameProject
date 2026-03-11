/////////////////////////////////////////////////////////||
//                     Sezione Import                    ||
/////////////////////////////////////////////////////////||

import  {
            getGlobalJSONMap,
            setGlobalJSONMap
        }
from './globalVariables.js';

import  { 
            updateMap 
        } 
from './updateMap.js';

/////////////////////////////////////////////////////////||
//                    Sezione Funzioni                   ||
/////////////////////////////////////////////////////////||
/**updateIsBlockCube aggiorna lo stato di blocco del cubo in base alla selezione effettuata nell'elemento checkbox.
 * 
 * @param {Event} ev 
 * @param {JSON} cubeJson 
 */
export function updateIsBlockCube(ev, cubeJson){
    const isBlockCube = ev.target.checked;
    let globalJSONMap = getGlobalJSONMap();
    let layer = globalJSONMap['map'][`${cubeJson.z}`];
    if (layer && layer[cubeJson.IdCube]) {
        layer[cubeJson.IdCube].isLooked = isBlockCube;
        setGlobalJSONMap(globalJSONMap);
        updateMap();
    } else {
        console.error(`Cubo con ID ${cubeJson.IdCube} non trovato nel layer L${cubeJson.z}`);
    }
    console.log(`Aggiornamento isBlockCube del cubo ${cubeJson.IdCube} a ${isBlockCube}`);
  
}
