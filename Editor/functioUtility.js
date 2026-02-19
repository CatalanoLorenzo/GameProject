import { 
    labelinputRow, 
    inputRow, 
    labelinputCol, 
    inputCol ,
    labelinputHeight,
    inputHeight,
    labelinputNameMap,
    inputNameMap,
    bottonCreateMap,
    bottonDownloadJsonMap} 
from './tools.js';
export let globalJSONMap = [];
let globalNameMap = '';
let globalX = 0;
let globalY = 0;
let globalZ = 0;    
/**
 * 
 * @param {HTMLElement} tools 
 */
export function renderPage (tools){
    console.log("Start render Page");

    tools.appendChild(labelinputRow);
    tools.appendChild(inputRow);
    tools.appendChild(labelinputCol);
    tools.appendChild(inputCol);   
    tools.appendChild(labelinputHeight);
    tools.appendChild(inputHeight); 
    tools.appendChild(labelinputNameMap);
    tools.appendChild(inputNameMap);
    bottonCreateMap.onclick = function() {renderMap(map,tools)};
    tools.appendChild(bottonCreateMap);

    console.log("Finish render Page");

}
/**
 * 
 * @param {HTMLElement} map 
 */
export function renderMap(map,tools){
    console.log("Generazione mappa inizio");

    getValueInput(globalX,globalY,globalZ,globalNameMap);
    generateMap(globalX,globalY,globalZ,globalNameMap,map);
    globalJSONMap =genetateJSONMap(globalX,globalY,globalZ,globalNameMap);
    tools.appendChild(bottonDownloadJsonMap);
    bottonDownloadJsonMap.onclick = function() {downloadJSONMap(globalJSONMap)};
    tools.removeChild(bottonCreateMap);
    console.log("Generazione mappa Fine");

}
/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @param {String} nameMap 
 */
function getValueInput(x,y,z,nameMap){
    x = inputRow.value;
    y = inputCol.value;
    z = inputHeight.value;
    nameMap = inputNameMap.value;
    globalNameMap = nameMap;
    globalX = x;
    globalY = y;
    globalZ = z;
    console.log(globalX,globalY,globalZ,globalNameMap);
    
}
/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @param {String} nameMap 
 * @returns 
 */
function createCube(x,y,z,nameMap){ 
    const divCube = document.createElement('div');
    divCube.id = `x${x}y${y}z${z}-L${z}-${nameMap}`;
    divCube.min = 0;
    divCube.value = 0;
    divCube.defaultValue = 0;
    divCube.classList.add("cube");
    return divCube;
}
/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @param {String} nameMap 
 */
function generateMap(x,y,z,nameMap,map){ 
    map.innerHTML='';
    for(let j = 0; j < y; j++){
        for(let k = 0; k < x; k++){
            let cube = createCube(k,j,0,nameMap);
            map.appendChild(cube);
        }
    }
}
/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} z 
 * @param {String} nameMap 
 * @returns 
 */
function genetateJSONMap(x,y,z,nameMap) {
    
    let JSONMap = [];
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
    return JSONMap;
}

export function downloadJSONMap(globalJSONMap) {
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