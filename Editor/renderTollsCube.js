import  {
            getCubeJsonSelectedById,
            getGlobalJSONMap,
            setGlobalJSONMap
        }
from './globalVariables.js';
import  { 
            updateMap 
        } 
from './updateMap.js';
import  { 
            labelSelectInputMesh,
            selectMesh,
            labelCheckBoxIsBlockCube,
            checkBoxIsBlockCube,
            labelcheckBoxIsTelepot,
            checkBoxIsTelepot,
            divToolsTelepot,
            labelinputDestinationLayer,
            labelinputDestinationX,
            labelinputDestinationY,
            inputDestinationLayer,
            inputDestinationX,
            inputDestinationY,
            bottonAddTelepot,
            bottonRemoveTelepot,
            selectTelepor,
            labelinputNameTeleport,
            inputNameTelepot,
            labelinputNameMapTeleport,
            inputNameMapTeleport
        } 
from './tools.js';
import  {
            labelNewTeleportCordinates
        }
from "./labelTextIta.js";

export function showToolsCube(e){
    console.log(`Informazioni del cubo ${e.target.id}: Valore: ${e.target.defaultValue}`);
    let cubeJson = getCubeJsonSelectedById(e.target.id);
    console.log(JSON.stringify(cubeJson));
    const tools = document.getElementById('tools');
    tools.appendChild(labelSelectInputMesh);
    selectMesh.value = cubeJson.mashCode;
    selectMesh.onchange = function(ev) {updateMashCube(ev, cubeJson)};
    tools.appendChild(selectMesh);
    tools.appendChild(labelCheckBoxIsBlockCube);
    checkBoxIsBlockCube.checked = cubeJson.isLooked;
    checkBoxIsBlockCube.onchange = function(ev) {updateIsBlockCube(ev, cubeJson)};
    tools.appendChild(checkBoxIsBlockCube);
    tools.appendChild(labelcheckBoxIsTelepot);
    checkBoxIsTelepot.checked = cubeJson.telepot.isTelepot;
    checkBoxIsTelepot.onchange = function(ev) {updateIsTelepotCube(ev, cubeJson)};
    tools.appendChild(checkBoxIsTelepot);
    tools.appendChild(divToolsTelepot);
    if (cubeJson.telepot.isTelepot) {
        renderTeleportSet(cubeJson.telepot);
    }else{
        divToolsTelepot.innerHTML = '';
    }

}
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
export function updateIsTelepotCube(ev, cubeJson){
    const isTelepotCube = ev.target.checked;
    let globalJSONMap = getGlobalJSONMap();
    let layer = globalJSONMap['map'][`${cubeJson.z}`];
    if (layer && layer[cubeJson.IdCube]) {
        layer[cubeJson.IdCube].telepot.isTelepot = isTelepotCube;
        setGlobalJSONMap(globalJSONMap);
        if (isTelepotCube) {
            renderTeleportSet(cubeJson.telepot);
        }else{            
            const divToolsTelepot = document.getElementById('div-tools-telepot');
            divToolsTelepot.innerHTML = '';
        }
        updateMap();
    } else {
        console.error(`Cubo con ID ${cubeJson.IdCube} non trovato nel layer L${cubeJson.z}`);
    }
    console.log(`Aggiornamento isTelepotCube del cubo ${cubeJson.IdCube} a ${isTelepotCube}`);
  
}
export function renderTeleportSet(teleportData){
    const divToolsTelepot = document.getElementById('div-tools-telepot');
    divToolsTelepot.innerHTML = '';
    selectTelepor.onchange = function() {updateValueInputTeleport(teleportData.coordinates)};
    const arrayOptionTelepor = Array.from(selectTelepor.options);
    arrayOptionTelepor
        .filter(option => option.value !== labelNewTeleportCordinates)
        .forEach(option => selectTelepor.removeChild(option));

    divToolsTelepot.appendChild(selectTelepor);
    if (Object.keys(teleportData.coordinates).length > 0) {
        Object.values(teleportData.coordinates).forEach(coordinate => {
            const optionTelepor = document.createElement('option');
            optionTelepor.value = `${coordinate["name"]}`;
            optionTelepor.text =  `${coordinate["name"]}`;
            selectTelepor.appendChild(optionTelepor);
            
        });
    }
    divToolsTelepot.appendChild(labelinputDestinationLayer);
    divToolsTelepot.appendChild(inputDestinationLayer);
    divToolsTelepot.appendChild(labelinputDestinationX);
    divToolsTelepot.appendChild(inputDestinationX);
    divToolsTelepot.appendChild(labelinputDestinationY);
    divToolsTelepot.appendChild(inputDestinationY);
    divToolsTelepot.appendChild(labelinputNameTeleport);
    divToolsTelepot.appendChild(inputNameTelepot);
    divToolsTelepot.appendChild(labelinputNameMapTeleport);
    divToolsTelepot.appendChild(inputNameMapTeleport);
    bottonAddTelepot.onclick = function() {addTeleportToCube(teleportData.coordinates)};
    divToolsTelepot.appendChild(bottonAddTelepot);
    bottonRemoveTelepot.onclick = function() {removeTeleportFromCube(teleportData.coordinates)};
    divToolsTelepot.appendChild(bottonRemoveTelepot);
}
export function addTeleportToCube(coordinates){
    console.log("Aggiunta Teletrasporto al Cubo");
    const SelectTeleport = document.getElementById('select-teleport');
    const inputLayer = document.getElementById('input-destination-layer');
    const inputX = document.getElementById('input-destination-x');
    const inputY = document.getElementById('input-destination-y');
    const inputNameTelepot = document.getElementById('input-name-telepot');
    const inputNameMapTeleport = document.getElementById('input-name-map-teleport');

    console.log("Valore Layer : " + inputLayer.value);
    console.log("Valore X : " + inputX.value);
    console.log("Valore Y : " + inputY.value);
    console.log("Valore Nome Teletrasporto : " + inputNameTelepot.value);
    console.log("Nome Mappa Teletrasporto : " + inputNameMapTeleport.value);
    console.log("Valore Select : " + SelectTeleport.value);
    const newCoordinate = {
        layer: parseInt(inputLayer.value),
        x: parseInt(inputX.value),
        y: parseInt(inputY.value),
        name: inputNameTelepot.value,
        nameMap: inputNameMapTeleport.value
    };
    if (SelectTeleport.value === labelNewTeleportCordinates) {
        coordinates[newCoordinate.name] = newCoordinate;
        const optionTelepor = document.createElement('option');
        optionTelepor.value = `${newCoordinate.name}`;
        optionTelepor.text = `${newCoordinate.name}`;
        SelectTeleport.appendChild(optionTelepor);
    }else{
        const coordinateName = SelectTeleport.value;
        delete coordinates[coordinateName];
        const optionTelepor = Array.from(SelectTeleport.options).find(option => option.value === SelectTeleport.value);
        if (optionTelepor) {
            SelectTeleport.removeChild(optionTelepor);
        }
        coordinates[newCoordinate.name] = newCoordinate;
        const optionTeleporNew = document.createElement('option');
        optionTeleporNew.value = `${newCoordinate.name}`;
        optionTeleporNew.text = `${newCoordinate.name}`;
        SelectTeleport.appendChild(optionTeleporNew);
    }
       console.log(coordinates);

}
export function removeTeleportFromCube(coordinates){
    console.log("Rimozione Teletrasporto dal Cubo");
    const SelectTeleport = document.getElementById('select-teleport');
    if (SelectTeleport.value !== labelNewTeleportCordinates) {
        const coordinateName = SelectTeleport.value;
        delete coordinates[coordinateName];
        const optionTelepor = Array.from(SelectTeleport.options).find(option => option.value === SelectTeleport.value);
        if (optionTelepor) {
            SelectTeleport.removeChild(optionTelepor);
        }

    }
    console.log(coordinates);
    
}
export function updateValueInputTeleport( coordinates){
    const SelectTeleport = document.getElementById('select-teleport');
    const inputLayer = document.getElementById('input-destination-layer');
    const inputX = document.getElementById('input-destination-x');
    const inputY = document.getElementById('input-destination-y');
    const inputNameTelepot = document.getElementById('input-name-telepot');
    const inputNameMapTeleport = document.getElementById('input-name-map-teleport');
    if (SelectTeleport.value !== labelNewTeleportCordinates) {
        inputLayer.value = coordinates[SelectTeleport.value]["layer"];
        inputX.value = coordinates[SelectTeleport.value]["x"];
        inputY.value = coordinates[SelectTeleport.value]["y"];
        inputNameTelepot.value = coordinates[SelectTeleport.value]["name"];
        inputNameMapTeleport.value = coordinates[SelectTeleport.value]["nameMap"];
    }
}