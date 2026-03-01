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
            setIsGeneratingMap,
            setglobalX,
            setglobalY,
            setglobalZ,
            setglobalNameMap
        }
from './globalVariables.js';
import  
        {
            labelinputRow,
            inputRow,
            labelinputCol,
            inputCol,
            labelinputHeight,
            inputHeight,
            labelinputNameMap,
            inputNameMap,
            bottonCreateMap
        }   
from './tools.js';    
import  
        { 
            renderMap 
        } 
from './renderMap.js';

////////////////////////////////////////
//FUNZIONIUTILITY: Funzioni di utilità//
////////////////////////////////////////

/**mountElementOnTools è una funzione che si occupa di montare gli elementi di controllo nella sidebar degli strumenti. 
 * La funzione aggiunge al div "tools" gli elementi di input per le dimensioni della mappa (righe, colonne, altezza) e il nome della mappa, 
 * 
 * @param {HTMLDivElement} tools 
 */
export function mountElementOnTools(tools){
    tools.appendChild(labelinputRow);
    inputRow.onchange = (e)=> updateGrid(e);
    tools.appendChild(inputRow);
    tools.appendChild(labelinputCol);
    inputCol.onchange = (e)=> updateGrid(e);
    tools.appendChild(inputCol);
    tools.appendChild(labelinputHeight);
    inputHeight.onchange = (e)=> updateGrid(e);
    tools.appendChild(inputHeight);
    tools.appendChild(labelinputNameMap);
    inputNameMap.onchange = (e)=> updateGrid(e);
    tools.appendChild(inputNameMap);
    bottonCreateMap.onclick = () => renderMap(map, tools);
    tools.appendChild(bottonCreateMap);
}
/**createCube è una funzione che crea un elemento div che rappresenta un cubo nella mappa. 
 *Il div viene identificato da un ID univoco basato sulle coordinate (x, y, z) e sul nome della mappa. 
 *Il div ha una classe CSS "cube" per lo styling e una proprietà defaultValue impostata a 0.
 * 
 * @returns {HTMLDivElement} - Il div che rappresenta un cubo
 */
function createCube(){ 
    const divCube = document.createElement('div');
    divCube.id = `x${getglobalX()}y${getglobalY()}z${getglobalZ()}-L${getglobalZ()}-${getglobalNameMap()}`;
    divCube.defaultValue = 0;
    divCube.classList.add("cube");
    return divCube;
}
/**generateMap è una funzione che genera la mappa visuale basata sulle dimensioni (x, y) e il nome della mappa forniti.
 * La funzione svuota il contenuto del div "map" e poi crea una griglia di cubi (div) in base alle dimensioni specificate. 
 * 
 * @param {HTMLDocument} map 
 */
export function generateMap(map){ 
    map.innerHTML='';
    let y = getglobalY();
    let x = getglobalX();
    let nameMap = getglobalNameMap();
    for(let j = 0; j < y; j++){
        for(let k = 0; k < x; k++){
            let cube = createCube(k,j,0,nameMap);
            map.appendChild(cube);
            setIsGeneratingMap();
        }
    }
}
/**
 * Genera una rappresentazione JSON della mappa basata sulle dimensioni e il nome forniti.
 * La struttura JSON è un array di layer, dove ogni layer contiene un array di cubi con le loro proprietà.
 * @param {String} nameMap 
 * @returns {Array} JSONMap - La rappresentazione JSON della mappa
 */
export function genetateJSONMap() {
    
    let JSONMap = [];
    let x = getglobalX();
    let y = getglobalY();
    let z = getglobalZ();
    let nameMap = getglobalNameMap();
    let infoMap = [
        {
            nameMap:nameMap,
            x:x,
            y:y,
            z:z
        }
    ]
    for (let i = 0; i < z; i++) {
        let layer = [];
        for (let j = 0; j < y; j++) {
            for (let k = 0; k < x; k++) {
                const cubeJson =    {
                                        IdCube:`x${x}y${y}z${z}-L${z}-${nameMap}`,
                                        x:0,
                                        y:0,
                                        z:0,
                                        mashCode:'0000',
                                        isLooked:false,
                                        listPlayer:[],
                                        listItem:[],
                                        telepot:[],
                                        listEvent:[]
                                    }
                layer.push(cubeJson);
            }
         
        }
        JSONMap.push(layer);  
    }
    JSONMap.push(infoMap);
    return JSONMap;
}
/**downloadJSONMap consente di scaricare la mappa in formato JSON. Il nome del file è basato sul nome della mappa fornito dall'utente.
 * La funzione crea un blob contenente la stringa JSON, genera un URL per il blob e simula un click su un elemento <a> per avviare il download.
 * Dopo il download, l'URL del blob viene revocato per liberare risorse.
 * 
 * @param {JSON} globalJSONMap 
 */
export function downloadJSONMap(globalJSONMap) {
    let globalNameMap = getglobalNameMap();
    console.log("Download JSON Map");
    const jsonStr = JSON.stringify(globalJSONMap);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${globalNameMap}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

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
                updateJsonMap(oldX,newX);
                setglobalX(newX);
                isChangeValue = true;
                break;
            case "input-col-map":
                let oldY = getglobalY();
                let newY = parseInt(value, 10) || 1;
                updateJsonMap(oldY,newY);
                setglobalY(newY);
                isChangeValue = true;
                break;
            case "input-height-map":
                let oldZ = getglobalZ();
                let newZ = parseInt(value, 10) || 1;
                updateJsonMap(oldZ,newZ);
                setglobalZ(newZ);
                isChangeValue = true;
                break;
            case "input-NameMap-map":
                let oldNameMap = getglobalNameMap();
                let newNameMap = value || '';
                updateJsonMap(oldNameMap,newNameMap);
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

export function updateJsonMap(oldValue,newValue){
    console.log("updateJsonMap");
    
}

export function updateMap(){
    console.log("updateMap");
}