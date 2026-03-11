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
/**updateMashCube aggiorna il codice della mesh del cubo in base alla selezione effettuata nell'elemento select.
 * 
 * @param {Event} ev 
 * @param {JSON} cubeJson 
 */
export function updateMashCube(ev, cubeJson){
    const newMashCode = ev.target.value;
    let globalJSONMap = getGlobalJSONMap();
    let layer = globalJSONMap['map'][`${cubeJson.z}`];
    if (layer && layer[cubeJson.IdCube]) {
        layer[cubeJson.IdCube].mashCode = newMashCode;
        setGlobalJSONMap(globalJSONMap);
        updateMap();
    } else {
        console.error(`Cubo con ID ${cubeJson.IdCube} non trovato nel layer L${cubeJson.z}`);
    }
    console.log(`Aggiornamento mash del cubo ${cubeJson.IdCube} a ${newMashCode}`);
  
}

