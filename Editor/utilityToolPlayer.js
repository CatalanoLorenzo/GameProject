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

import  { 
            labelSelectInputPlayer,
            selectPlayer,
            labelInputPlayerName,
            inputPlayerName,
            bottonAddPlayer,
            bottonRemovePlayer,
            divToolsPlayer,
            bottonAddPlayer,
            bottonRemovePlayer
        } 
from './tools.js';

import  {
            labelNewEvent,
            labelNewPlayer
        }
from "./labelTextIta.js";
/////////////////////////////////////////////////////////||
//                    Sezione Funzioni                   ||
/////////////////////////////////////////////////////////||
/**
 * 
 * 
 * @param {event} ev 
 * @param {JSON} cubeJson 
 */
export function updateIsPlayerCube(ev, cubeJson){
    const isPlayerCube = ev.target.checked;
    let globalJSONMap = getGlobalJSONMap();
    let layer = globalJSONMap['map'][`${cubeJson.z}`];
    if (layer && layer[cubeJson.IdCube]) {
        layer[cubeJson.IdCube]["player"].isPlayer = isPlayerCube;
        setGlobalJSONMap(globalJSONMap);
        if (isPlayerCube) {
            renderEventSet(cubeJson.player);
        }else{            
            const divToolsPlayer = document.getElementById('div-tools-player');
            divToolsPlayer.innerHTML = '';
        }
        updateMap();
    } else {
        console.error(`Cubo con ID ${cubeJson.IdCube} non trovato nel layer L${cubeJson.z}`);
    }
    console.log(`Aggiornamento isPlayerCube del cubo ${cubeJson.IdCube} a ${isPlayerCube}`);
}
/**
 * 
 * @param {JSON} PlayerJson 
 */
export function renderPlayerSet(PlayerJson){
    
    divToolsPlayer.innerHTML = '';
    selectPlayer.onchange = function() {updateIsPlayerCube()};
    const arrayOptionsEvent = Array.from(selectPlayer.options);
    arrayOptionsEvent.filter(option => option.value !== labelNewPlayer).forEach(option => selectPlayer.removeChild(option));
    divToolsPlayer.appendChild(labelSelectInputPlayer);
    divToolsPlayer.appendChild(selectPlayer);
    if(Object.keys(PlayerJson.listPlayers).length > 0){
        Object.values(PlayerJson.listPlayers).forEach(player => {
            const optionPlayer = document.createElement('option');
            optionPlayer.value = `${player["name"]}`;
            optionPlayer.text =  `${player["name"]}`;
            selectPlayer.appendChild(optionPlayer);
        });
    }
    divToolsPlayer.appendChild(labelInputPlayerName);
    divToolsPlayer.appendChild(inputPlayerName);
    bottonAddPlayer.onclick = function() {addPlayerCube(eventJson)};
    divToolsPlayer.appendChild(bottonAddPlayer);
    bottonRemovePlayer.onclick = function() {removePlayerCube(eventJson)};
    divToolsPlayer.appendChild(bottonRemovePlayer);
}
/**
 *  
 * @param {JSON} PlayerJson 
 */
export function addPlayerCube(PlayerJson){
console.log("Aggiunta Giocatore al Cubo");
    const selectPlayer = document.getElementById('select-player');
    const inputNamePlayer = document.getElementById('input-player-name');
    console.log("Valore Nome Giocatore : " + inputNamePlayer.value);
    console.log("Valore Select : " + selectPlayer.value);
    const newPlayer = {
        name: inputNamePlayer.value
    };
    if (selectPlayer.value === labelnewPlayer) {
        PlayerJson.listPlayers [newPlayer.name] = newPlayer;
        const optionPlayer = document.createElement('option');
        optionPlayer.value = `${newPlayer.name}`;
        optionPlayer.text = `${newPlayer.name}`;
        selectPlayer.appendChild(optionPlayer);
    }else{
        const namePlayer = selectPlayer.value;
        delete PlayerJson.listPlayer[namePlayer];
        const optionPlayer = Array.from(selectPlayer.options).find(option => option.value === selectPlayer.value);
        if (optionPlayer) {
            selectPlayer.removeChild(optionPlayer);
        }
        PlayerJson.listPlayer[newPlayer.name] = newPlayer;
        const optionPlayerNew = document.createElement('option');
        optionPlayerNew.value = `${newPlayer.name}`;
        optionPlayerNew.text = `${newPlayer.name}`;
        selectPlayer.appendChild(optionPlayerNew);
    }
       console.log(PlayerJson);

}
/**
 *  
 * @param {JSON} playerJSON 
 */
export function removePlayerCube(playerJSON){
   console.log("Rimozione Giocatore dal Cubo");
    const selectPlayer = document.getElementById('select-player');
    if (selectPlayer.value !== labelNewPlayer) {
        const namePlayer = selectPlayer.value;
        delete playerJSON.listPlayer[namePlayer];
        const optionPlayer = Array.from(selectPlayer.options).find(option => option.value === selectPlayer.value);
        if (optionPlayer) {
            selectPlayer.removeChild(optionPlayer);
        }

    }
    console.log(playerJSON);
    
}
/**
 * 
 */
export function updateValueInputPlayer( ){
    const SelectPlayer = document.getElementById('select-player');
    const inputNamePlayer = document.getElementById('input-player-name');
    if (SelectPlayer.value !== labelNewPlayer) {
        inputNamePlayer.value = [SelectPlayer.value];
    }
}