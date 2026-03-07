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
            setglobalNameMap,
            getGlobalSelectZ
        }
from './globalVariables.js';
import {createCube} from './functioUtility.js';


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
                let newX = parseInt(value) ;
                updateJsonMap(oldX,newX,"x");
                setglobalX(newX);
                isChangeValue = true;
                break;
            case "input-col-map":
                let oldY = getglobalY();
                let newY = parseInt(value) ;
                updateJsonMap(oldY,newY,"y");
                setglobalY(newY);
                isChangeValue = true;
                break;
            case "input-height-map":
                let oldZ = getglobalZ();
                let newZ = parseInt(value) ;
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
    if (globalJSONMap["map"].length > 0) {
        if (globalJSONMap["infoMap"]) {
            switch (inputType) {
                case "x":
                    globalJSONMap["infoMap"]["x"] = newValue;
                    break;
                case "y":
                    globalJSONMap["infoMap"]["y"] = newValue;
                    break;
                case "z":
                    globalJSONMap["infoMap"]["z"] = newValue;
                    break;
                case "nameMap":
                    globalJSONMap["infoMap"]["nameMap"] = newValue;
                    break;
                default:
                    console.error(`Tipo di input non riconosciuto: ${inputType}`);
                    break;
            }
        }
        if (oldValue < newValue || (inputType === "nameMap" && oldValue !== newValue)) {
            // Aggiunta di cubi
            console.log(`Aggiunta (da ${oldValue} a ${newValue})`);  
            globalJSONMap["map"].forEach((layer, layerIndex) => {
                switch (inputType) {
                    case "x":
                        for (let x = oldValue + 1; x <= newValue; x++) {
                            for (let y = 0; y <= globalJSONMap["infoMap"]["y"]; y++) {
                                let idCube = `x${x}y${y}z${layerIndex}-L${layerIndex}-${globalJSONMap["infoMap"]["nameMap"]}`;
                                layer[idCube] = createCubeJson(x, y, layerIndex, globalJSONMap["infoMap"]["nameMap"]);
                                console.log(`Cubo aggiunto: x=${x}, y=${y}, z=${layerIndex}`);
                            }
                        }
                        break;
                    case "y":
                        for (let y = oldValue + 1; y <= newValue; y++) {
                            for (let x = 0; x <= globalJSONMap["infoMap"]["x"]; x++) {
                                let idCube = `x${x}y${y}z${layerIndex}-L${layerIndex}-${globalJSONMap["infoMap"]["nameMap"]}`;
                                layer[idCube] = createCubeJson(x, y, layerIndex, globalJSONMap["infoMap"]["nameMap"]);
                                console.log(`Cubo aggiunto: x=${x}, y=${y}, z=${layerIndex}`);
                            }
                        }
                        break;
                    case "z":
                        // Handled separately
                        break;
                    case "nameMap":
                        // Aggiorna il nome della mappa in tutti i cubi
                        let idsToUpdate = Object.keys(layer);
                        idsToUpdate.forEach(oldIdCube => {
                            const cube = layer[oldIdCube];
                            const newIdCube = `x${cube.x}y${cube.y}z${cube.z}-L${cube.z}-${newValue}`;
                            cube.IdCube = newIdCube;
                            layer[newIdCube] = cube;
                            delete layer[oldIdCube];
                            console.log(`Cubo aggiornato: ${newIdCube}`);
                        });
                        break;
                    default:
                        console.error(`Tipo di input non riconosciuto: ${inputType}`);
                        break;
                }
            });

            // Gestione speciale per z (nuovi layer)
            if (inputType === "z") {
                for (let z = oldValue + 1; z <= newValue; z++) {
                    let newLayer = {};
                    for (let y = 0; y <= globalJSONMap["infoMap"]["y"]; y++) {
                        for (let x = 0; x <= globalJSONMap["infoMap"]["x"]; x++) {
                            let idCube = `x${x}y${y}z${z}-L${z}-${globalJSONMap["infoMap"]["nameMap"]}`;
                            newLayer[idCube] = createCubeJson(x, y, z, globalJSONMap["infoMap"]["nameMap"]);
                            console.log(`Cubo aggiunto: x=${x}, y=${y}, z=${z}`);
                        }
                    }
                    globalJSONMap["map"].push(newLayer);
                }
            }

            console.log(globalJSONMap);  

        } else if (oldValue > newValue) {
            // Rimozione di cubi
            console.log(`Rimozione (da ${oldValue} a ${newValue})`);
            
            globalJSONMap["map"].forEach((layer, layerIndex) => {
                switch (inputType) {
                    case "x":
                        // Rimuovi cubi con x > newValue
                        let idsToRemoveX = Object.keys(layer).filter(idCube => {
                            let coordMatch = idCube.match(/^x(\d+)y(\d+)z(\d+)/);
                            if (coordMatch) {
                                return parseInt(coordMatch[1]) > newValue;
                            }
                            return false;
                        });
                        idsToRemoveX.forEach(idCube => delete layer[idCube]);
                        console.log(`Rimossi ${idsToRemoveX.length} cubi`);
                        break;
                    case "y":
                        // Rimuovi cubi con y > newValue
                        let idsToRemoveY = Object.keys(layer).filter(idCube => {
                            let coordMatch = idCube.match(/^x(\d+)y(\d+)z(\d+)/);
                            if (coordMatch) {
                                return parseInt(coordMatch[2]) > newValue;
                            }
                            return false;
                        });
                        idsToRemoveY.forEach(idCube => delete layer[idCube]);
                        console.log(`Rimossi ${idsToRemoveY.length} cubi`);
                        break;
                    case "z":
                        // Handled separately
                        break;
                    default:
                        console.error(`Tipo di input non riconosciuto: ${inputType}`);
                        break;
                }
            });

            // Gestione speciale per z (rimuovi layer)
            if (inputType === "z") {
                globalJSONMap["map"].splice(newValue + 1);
                console.log(`Rimossi layer da ${newValue + 1}`);
            }

            console.log(globalJSONMap);
        }   
    }
    setGlobalJSONMap(globalJSONMap);
}

/**Aggiorna la visualizzazione della mappa basata sul JSON globale e sul livello Z selezionato.
 * Ricostruisce la griglia dei cubi in base alle dimensioni e al nome della mappa, e adatta le dimensioni dei cubi per riempire lo spazio disponibile.
 * Viene chiamata ogni volta che l'utente modifica uno degli input durante la generazione della mappa.
 * @returns {void}
 */
export function updateMap(){
    console.log("updateMap");
    let globalJSONMap = getGlobalJSONMap();
    let selectZ = getGlobalSelectZ();
    let x = globalJSONMap["infoMap"]["x"];
    let y = globalJSONMap["infoMap"]["y"];
    let map = document.getElementById("map");
    map.innerHTML = '';
    for(let j = 0; j <= y; j++){
        for(let k = 0; k <= x; k++){
            let cube = createCube(k,j,selectZ,globalJSONMap["infoMap"]["nameMap"]);
            map.appendChild(cube);
        }
    }
    const cols = parseInt(x+1)  ;
    const totalW = map.getBoundingClientRect().width ;
    const cubeW = Math.max(1, Math.floor(totalW / cols));
    document.documentElement.style.setProperty('--widthCube', `${cubeW}px`);
    document.documentElement.style.setProperty('--heightCube', `${cubeW}px`);

    // Forza esattamente `cols` colonne da JS (ogni colonna larga `cubeW`)
    map.style.gridTemplateColumns = `repeat(${cols}, ${cubeW}px)`;
    map.style.gridAutoRows = `${cubeW}px`;
}