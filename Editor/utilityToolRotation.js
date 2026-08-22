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
/**updateRotationCube aggiorna la rotazione (in gradi) del cubo sull'asse specificato in base al valore inserito nell'input.
 *
 * @param {Event} ev
 * @param {JSON} cubeJson
 * @param {String} axis - Asse da aggiornare ('x', 'y' o 'z')
 */
export function updateRotationCube(ev, cubeJson, axis){
    const newRotation = parseFloat(ev.target.value) || 0;
    let globalJSONMap = getGlobalJSONMap();
    let layer = globalJSONMap['map'][`${cubeJson.z}`];
    if (layer && layer[cubeJson.IdCube]) {
        layer[cubeJson.IdCube].rotation[axis] = newRotation;
        setGlobalJSONMap(globalJSONMap);
        updateMap();
    } else {
        console.error(`Cubo con ID ${cubeJson.IdCube} non trovato nel layer L${cubeJson.z}`);
    }
    console.log(`Aggiornamento rotazione asse ${axis} del cubo ${cubeJson.IdCube} a ${newRotation}`);
}
