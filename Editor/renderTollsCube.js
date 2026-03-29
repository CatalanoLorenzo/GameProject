/////////////////////////////////////////////////////////||
//                     Sezione Import                    ||
/////////////////////////////////////////////////////////||

import  {
            getCubeJsonSelectedById
        }
from './globalVariables.js';

import  { 
            labelSelectInputMesh,
            selectMesh,
            labelCheckBoxIsBlockCube,
            checkBoxIsBlockCube,
            labelcheckBoxIsTelepot,
            checkBoxIsTelepot,
            divToolsTelepot,
            labelcheckBoxIsEvent,
            checkBoxIsEvent,
            divToolsEvent,
            labelcheckBoxIsPlayer,
            checkBoxIsPlayer,
            divToolsPlayers
        } 
from './tools.js';

import  {
            updateIsTelepotCube,
            renderTeleportSet
        }       

from './utilityToolTeleport.js';

import  {
            updateMashCube
        } 
from './utilityToolMash.js';

import  {
            updateIsBlockCube
        } 
from './utilityToolIsBlock.js';

import  { 
            updateIsEventCube 
        } 
from './utilityToolEvent.js';

import  {
            updateIsPlayerCube
        }
from './utilityToolPlayer.js';

/////////////////////////////////////////////////////////||
//                    Sezione Funzioni                   ||
/////////////////////////////////////////////////////////||

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
    tools.appendChild(labelcheckBoxIsEvent);
    checkBoxIsEvent.checked = cubeJson.isEvent;
    checkBoxIsEvent.onchange = function(ev) {updateIsEventCube(ev, cubeJson)};
    tools.appendChild(checkBoxIsEvent);
    tools.appendChild(divToolsEvent);
    tools.appendChild(labelcheckBoxIsPlayer);
    checkBoxIsPlayer.checked = cubeJson.isEvent;
    checkBoxIsPlayer.onchange = function(ev) {updateIsPlayerCube(ev, cubeJson)};
    tools.appendChild(checkBoxIsPlayer);
    tools.appendChild(divToolsPlayers);


}

