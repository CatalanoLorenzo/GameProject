//////////////////////////////////
//IMPORTAZIONE VARIABILI GLOBALI//
//////////////////////////////////
import  
        { 
            getglobalX,
            getglobalY,
            getglobalZ,
            getglobalNameMap,
            getIsGeneratingMap,
            getGlobalJSONMap,
            setGlobalJSONMap,
            setglobalX,
            setglobalY,
            setglobalZ,
            setglobalNameMap
        }
from './globalVariables.js';



/**updateGrid è una funzione che viene chiamata quando l'utente modifica uno degli input (righe, colonne, altezza, nome mappa) durante la generazione della mappa.
 * 
 * @param {EventListener} e 
 */
export function updateGrid(e){
    if (getIsGeneratingMap()) {
        let id = e.currentTarget.id;
        let value = e.currentTarget.value;
        console.log(`e.currentTarget.id : ${e.currentTarget.id}   e.target.value : ${e.target.value}`);
        let isChangeValue = false;
        switch (id) {
            case "input-row-map":
                let oldX = getglobalX();
                let newX = parseInt(value, 10) || 1;
                updateJsonMap(oldX,newX,"x");
                setglobalX(newX);
                isChangeValue = true;
                break;
            case "input-col-map":
                let oldY = getglobalY();
                let newY = parseInt(value, 10) || 1;
                updateJsonMap(oldY,newY,"y");
                setglobalY(newY);
                isChangeValue = true;
                break;
            case "input-height-map":
                let oldZ = getglobalZ();
                let newZ = parseInt(value, 10) || 1;
                updateJsonMap(oldZ,newZ,"z");
                setglobalZ(newZ);
                isChangeValue = true;
                break;
            case "input-NameMap-map":
                let oldNameMap = getglobalNameMap();
                let newNameMap = value || '';
                updateJsonMap(oldNameMap,newNameMap,"nameMap");
                setglobalNameMap(newNameMap);
                isChangeValue = true;
                break;
            default:
                console.error(`ID non riconosciuto: ${id}`);
                break;
        }
        if (isChangeValue) {
            updateMap();
        }
    }
}

/**
 * Crea un singolo cubo JSON con le coordinate specificate
 * @param {Number} x - Coordinata X
 * @param {Number} y - Coordinata Y
 * @param {Number} z - Coordinata Z
 * @param {String} nameMap - Nome della mappa
 * @returns {Object} Oggetto cubo con tutte le proprietà inizializzate
 */
function createCubeJson(x, y, z, nameMap) {
    return {
        IdCube: `x${x}y${y}z${z}-L${z}-${nameMap}`,
        x: x,
        y: y,
        z: z,
        mashCode: '0000',
        isLooked: false,
        listPlayer: [],
        listItem: [],
        telepot: [],
        listEvent: []
    };
}

/**
 * Aggiorna la mappa JSON quando cambiano le dimensioni (x, y, z) o il nome
 * Aggiunge o rimuove cubi in base al tipo di input
 * @param {Number} oldValue - Valore precedente
 * @param {Number} newValue - Nuovo valore
 * @param {String} inputType - Tipo di input ('x', 'y', 'z', 'nameMap')
 */
export function updateJsonMap(oldValue, newValue, inputType) {
    console.log(`updateJsonMap: oldValue : ${oldValue}  newValue : ${newValue} inputType : ${inputType}`);
    let globalJSONMap = getGlobalJSONMap();
    if (globalJSONMap.length > 0) {
        if (globalJSONMap[0].infoMap) {
            switch (inputType) {
                case "x":
                    globalJSONMap[0].infoMap.x = newValue;
                    break;
                case "y":
                    globalJSONMap[0].infoMap.y = newValue;
                    break;
                case "z":
                    globalJSONMap[0].infoMap.z = newValue;
                    break;
                case "nameMap":
                    globalJSONMap[0].infoMap.nameMap = newValue;
                    break;
                default:
                    console.error(`Tipo di input non riconosciuto: ${inputType}`);
                    break;
            }
        }

        let layers = globalJSONMap.map// Tutti gli elementi tranne l'ultimo (infoMap)
        let nameMap = globalJSONMap[0].infoMap.nameMap;

        switch (inputType) {
            // ========== GESTIONE LARGHEZZA (X) ==========
            case "x":
                if (oldValue < newValue) {
                    // Aggiunta di colonne
                    let diffX = newValue - oldValue;
                    console.log(`Aggiunta di ${diffX} colonne (da ${oldValue} a ${newValue})`);
                    
                    layers.forEach((layer, layerIndex) => {
                        for (let x = oldValue+1; x < newValue; x++) {
                            for (let y = 0; y < infoMap.y; y++) {
                                const newCube = createCubeJson(x, y, layerIndex, nameMap);
                                layer.push(newCube);
                                console.log(`Cubo aggiunto: x=${x}, y=${y}, z=${layerIndex}`);
                            }
                        }
                    });
                                            console.log(globalJSONMap);

                } else if (oldValue > newValue) {
                    // Rimozione di colonne
                    console.log(`Rimozione di colonne (da ${oldValue} a ${newValue})`);
                    
                    layers.forEach(layer => {
                        // Filtra i cubi mantenendo solo quelli con x < newValue
                        let cubesToKeep = [];
                        layer.forEach(cube => {
                            console.log(cube.IdCube);
                            
                            // Estrai la coordinata x dall'IdCube (formato: x[num]y[num]z[num]-...)
                            let coordMatch = cube.IdCube.match(/^x(\d+)y(\d+)z(\d+)/);
                            if (coordMatch) {
                                let cubeX = parseInt(coordMatch[1]);
                                if (cubeX < newValue) {
                                    cubesToKeep.push(cube);
                                }
                            }
                        });
                        // Sostituisci il contenuto del layer
                        layer.length = 0;
                        cubesToKeep.forEach(cube => layer.push(cube));
                        console.log(globalJSONMap);
                        
                    });
                }
                break;

            // ========== GESTIONE PROFONDITÀ (Y) ==========
            case "y":
                if (oldValue < newValue) {
                    // Aggiunta di righe
                    let diffY = newValue - oldValue;
                    console.log(`Aggiunta di ${diffY} righe (da ${oldValue} a ${newValue})`);
                    
                    layers.forEach((layer, layerIndex) => {
                        for (let j = oldValue; j < newValue; j++) {
                            for (let k = 0; k < infoMap.x; k++) {
                                const newCube = createCubeJson(k, j, layerIndex, nameMap);
                                layer.push(newCube);
                                console.log(`Cubo aggiunto: x=${k}, y=${j}, z=${layerIndex}`);
                            }
                        }
                    });
                } else if (oldValue > newValue) {
                    // Rimozione di righe
                    console.log(`Rimozione di righe (da ${oldValue} a ${newValue})`);
                    
                    layers.forEach(layer => {
                        // Filtra i cubi mantenendo solo quelli con y < newValue
                        let cubesToKeep = [];
                        layer.forEach(cube => {
                            // Estrai la coordinata y dall'IdCube (formato: x[num]y[num]z[num]-...)
                            let coordMatch = cube.IdCube.match(/^x(\d+)y(\d+)z(\d+)/);
                            if (coordMatch) {
                                let cubeY = parseInt(coordMatch[2]);
                                if (cubeY < newValue) {
                                    cubesToKeep.push(cube);
                                }
                            }
                        });
                        // Sostituisci il contenuto del layer
                        layer.length = 0;
                        cubesToKeep.forEach(cube => layer.push(cube));
                    });
                }
                break;

            // ========== GESTIONE ALTEZZA (Z) ==========
            case "z":
                if (oldValue < newValue) {
                    // Aggiunta di strati (layer)
                    let diffZ = newValue - oldValue;
                    console.log(`Aggiunta di ${diffZ} strati (da ${oldValue} a ${newValue})`);
                    
                    for (let i = oldValue; i < newValue; i++) {
                        let newLayer = [];
                        for (let j = 0; j < infoMap.y; j++) {
                            for (let k = 0; k < infoMap.x; k++) {
                                const newCube = createCubeJson(k, j, i, nameMap);
                                newLayer.push(newCube);
                            }
                        }
                        layers.push(newLayer);
                        console.log(`Strato ${i} aggiunto con ${newLayer.length} cubi`);
                    }
                } else if (oldValue > newValue) {
                    // Rimozione di strati
                    console.log(`Rimozione di strati (da ${oldValue} a ${newValue})`);
                    
                    // Mantieni solo i primi newValue strati (non contare infoMap)
                    globalJSONMap = globalJSONMap.slice(0, newValue);
                }
                break;
        }

        setGlobalJSONMap(globalJSONMap);
    }
}

export function updateMap(){
    console.log("updateMap");
}