////////////////
//IMPORTAZIONE//
////////////////
import  { 
            genetateJSONMap,
            generateMap, 
            downloadJSONMap,
        }from "./functioUtility.js";
import  { 
            bottonCreateMap,
            bottonDownloadJsonMap,
            inputSelectZ,
            labelinputSelectZ,
            divModalUploadMap
        }from './tools.js';
import  { 
            setGlobalJSONMap,
            setGlobalSelectZ,
            getglobalX,
            getglobalY,
            getglobalZ,
            getglobalNameMap,
            getValueInput,
            getGlobalJSONMap

        }from "./globalVariables.js";
import { updateMap } from "./updateMap.js";
import { clearSelection } from "./utilityToolMultiSelect.js";

/////////////
//FUNZIONIU//
////////////
/**renderizza la mappa, genera il json e aggiorna gli strumenti per il download e la selezione del piano Z
 * 
 * @param {HTMLDivElement} map 
 * @param {HTMLDivElement} tools 
 */
export function renderMap(map,tools){
    console.log("Generazione mappa inizio");
     if(tools.contains(divModalUploadMap)){
        tools.removeChild(divModalUploadMap);
     };
       getValueInput();

    // Dopo il rendering, calcola la larghezza del singolo cubo
    // in modo che ogni riga contenga `globalX` cubi e costruisci una grid
    const cols = parseInt(getglobalX()+1)  ;
    const totalW = map.getBoundingClientRect().width ;
    const cubeW = Math.max(1, Math.floor(totalW / cols));
    document.documentElement.style.setProperty('--widthCube', `${cubeW}px`);
    document.documentElement.style.setProperty('--heightCube', `${cubeW}px`);

    // Forza esattamente `cols` colonne da JS (ogni colonna larga `cubeW`)
    map.style.gridTemplateColumns = `repeat(${cols}, ${cubeW}px)`;
    map.style.gridAutoRows = `${cubeW}px`;

    const jsonMap = genetateJSONMap(getglobalX(),getglobalY(),getglobalZ(),getglobalNameMap());
    // aggiorna la variabile globale esportata in functioUtility
    setGlobalJSONMap(jsonMap);
    generateMap(map);

    tools.appendChild(bottonDownloadJsonMap);
    bottonDownloadJsonMap.onclick = function() {downloadJSONMap(getGlobalJSONMap())};
    tools.removeChild(bottonCreateMap);
    tools.appendChild(labelinputSelectZ);
    tools.appendChild(inputSelectZ);
    inputSelectZ.onchange = function(e) {
        clearSelection();
        setGlobalSelectZ(parseInt(e.target.value));
        updateMap();
    }
    console.log("Generazione mappa Fine");

}