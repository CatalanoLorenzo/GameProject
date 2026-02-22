import  { 
            genetateJSONMap,
            generateMap, 
            downloadJSONMap,
        }from "./functioUtility.js";
import  { 
            bottonCreateMap,
            bottonDownloadJsonMap
        }from './tools.js';
import  { 
            setGlobalJSONMap,
            getglobalX,
            getglobalY,
            getglobalZ,
            getglobalNameMap,
            getValueInput,
            getGlobalJSONMap

        }from "./globalVariables.js";
export function renderMap(map,tools){
    console.log("Generazione mappa inizio");

    getValueInput();
    generateMap(map);

    // Dopo il rendering, calcola la larghezza del singolo cubo
    // in modo che ogni riga contenga `globalX` cubi e costruisci una grid
    const cols = parseInt(getglobalX(), 10) || 1;
    const totalW = map.getBoundingClientRect().width || 0;
    const cubeW = Math.max(1, Math.floor(totalW / cols));
    document.documentElement.style.setProperty('--widthCube', `${cubeW}px`);
    document.documentElement.style.setProperty('--heightCube', `${cubeW}px`);

    // Forza esattamente `cols` colonne da JS (ogni colonna larga `cubeW`)
    map.style.gridTemplateColumns = `repeat(${cols}, ${cubeW}px)`;
    map.style.gridAutoRows = `${cubeW}px`;

    const jsonMap = genetateJSONMap(getglobalX(),getglobalY(),getglobalZ(),getglobalNameMap());
    // aggiorna la variabile globale esportata in functioUtility
    setGlobalJSONMap(jsonMap);
    tools.appendChild(bottonDownloadJsonMap);
    bottonDownloadJsonMap.onclick = function() {downloadJSONMap(getGlobalJSONMap())};
    tools.removeChild(bottonCreateMap);
    console.log("Generazione mappa Fine");

}