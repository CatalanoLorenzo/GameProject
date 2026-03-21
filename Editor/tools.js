/////////////////////////////////////////////////////////||
//                     Sezione Import                    ||
/////////////////////////////////////////////////////////||

import  { 
            labelRow, 
            labelCol,
            labelHeight,
            labelGenerateMap,
            labelNameMap,
            labelDownloadMap,
            labelSelectZ,
            labelSelectMesh,
            labelIsBlockCube,
            labelDestinationLayerTelepotCube,
            labelDestinationXTelepotCube,
            labelDestinationYTelepotCube,
            labelIsTelepotCube,
            labelBottonAddTeleportCube,
            labelBottonRemoveTeleportCube,
            labelNewTeleportCordinates,
            labelNameTeleport,
            labelNameMapTeleport,
            labelSelectEvent,
            labelNewEvent,
            labelIsEvent,
            labelNameEvent,
            labelBottonAddEvent,
            labelBottonRemoveEvent,
            labelUpLoadMap,
            labelUploadMap,
            labelYesOrNoUpladMap,
            labelYes,
            labelNo,
            labelBottonAddPlayerCube,
            labelBottonRemovePlayerCube,
            labelNewPlayer
        } 
from "./labelTextIta.js";

import  { 
            getGlobalJsonMash 
        } 
from "./globalVariables.js"; 

/////////////////////////////////////////////////////////||
//                     Sezione Label                     ||
/////////////////////////////////////////////////////////||

export const labelinputRow = document.createElement('label');
labelinputRow.htmlFor = "input-row-map";
labelinputRow.innerText = labelRow;

export const labelinputCol = document.createElement('label');
labelinputCol.htmlFor = "input-col-map";
labelinputCol.innerText = labelCol;

export const labelinputHeight = document.createElement('label');
labelinputHeight.htmlFor = "input-height-map";
labelinputHeight.innerText = labelHeight;

export const labelinputSelectZ = document.createElement('label');
labelinputSelectZ.htmlFor = "input-select-z";
labelinputSelectZ.innerText = labelSelectZ;

export const labelinputNameMap = document.createElement('label');
labelinputNameMap.htmlFor = "input-NameMap-map";
labelinputNameMap.innerText = labelNameMap;

export const labelSelectInputMesh = document.createElement('label');
labelSelectInputMesh.htmlFor = "select-mesh";
labelSelectInputMesh.innerText = labelSelectMesh;

export const labelCheckBoxIsBlockCube = document.createElement('label');
labelCheckBoxIsBlockCube.htmlFor = "checkbox-is-block-cube";
labelCheckBoxIsBlockCube.innerText = labelIsBlockCube;

export const labelcheckBoxIsTelepot = document.createElement('label');
labelcheckBoxIsTelepot.htmlFor = "checkbox-is-telepot";
labelcheckBoxIsTelepot.innerText = labelIsTelepotCube;

export const labelinputDestinationLayer = document.createElement('label');
labelinputDestinationLayer.htmlFor = "input-destination-layer";
labelinputDestinationLayer.innerText = labelDestinationLayerTelepotCube;

export const labelinputDestinationX = document.createElement('label');
labelinputDestinationX.htmlFor = "input-destination-x";
labelinputDestinationX.innerText = labelDestinationXTelepotCube;

export const labelinputDestinationY = document.createElement('label');
labelinputDestinationY.htmlFor = "input-destination-y";
labelinputDestinationY.innerText = labelDestinationYTelepotCube;

export const labelinputNameMapTeleport = document.createElement('label');
labelinputNameMapTeleport.htmlFor = "input-name-map-teleport";
labelinputNameMapTeleport.innerText = labelNameMapTeleport;

export const labelinputNameTeleport = document.createElement('label');
labelinputNameTeleport.htmlFor = "input-name-teleport";
labelinputNameTeleport.innerText = labelNameTeleport;

export const labelSelectInputEvent = document.createElement('label');
labelSelectInputEvent.htmlFor = "select-event";
labelSelectInputEvent.innerText = labelSelectEvent;

export const labelcheckBoxIsEvent = document.createElement('label');
labelcheckBoxIsEvent.htmlFor = "checkbox-is-event";
labelcheckBoxIsEvent.innerText = labelIsEvent;

export const labelInputEventName = document.createElement('label');
labelInputEventName.htmlFor = "input-event-name";
labelInputEventName.innerText = labelNameEvent;

export const labelInputUpLoadMap= document.createElement('label');
labelInputUpLoadMap.htmlFor =  'input-upload-map';
labelInputUpLoadMap.innerText = labelUploadMap;

/////////////////////////////////////////////////////////||
//                     Sezione Input                     ||
/////////////////////////////////////////////////////////||

export const inputRow = document.createElement('input');
inputRow.classList.add("input-row");
inputRow.type = "number";
inputRow.id = "input-row-map";
inputRow.min = 0;
inputRow.value = 0;
inputRow.defaultValue = 0;

export const inputCol = document.createElement('input');
inputCol.classList.add("input-col");
inputCol.type = "number";
inputCol.id = "input-col-map";
inputCol.min = 0;
inputCol.value = 0;
inputCol.defaultValue = 0;

export const inputHeight = document.createElement('input');
inputHeight.classList.add("input-height");
inputHeight.type = "number";
inputHeight.id = "input-height-map";
inputHeight.min = 0;
inputHeight.value = 0;
inputHeight.defaultValue = 0;

export const inputSelectZ= document.createElement('input');
inputSelectZ.classList.add("input-select-z");
inputSelectZ.type = "number";
inputSelectZ.id = "input-select-z";
inputSelectZ.min = 0;
inputSelectZ.value = 0;
inputHeight.defaultValue = 0;

export const inputNameMap = document.createElement('input');
inputNameMap.classList.add("input-NameMap");
inputNameMap.type = "text";
inputNameMap.id = "input-NameMap-map";
inputNameMap.min = 1;
inputNameMap.max = 255;
inputNameMap.defaultValue = 'NameMap';

export const inputNameTelepot = document.createElement('input');
inputNameTelepot.classList.add("input-name-telepot");
inputNameTelepot.type = "text";
inputNameTelepot.id = "input-name-telepot";
inputNameTelepot.min = 1;
inputNameTelepot.max = 255;
inputNameTelepot.defaultValue = 'NameTelepot';

export const inputNameMapTeleport = document.createElement('input');
inputNameMapTeleport.classList.add("input-name-map-teleport");
inputNameMapTeleport.type = "text";
inputNameMapTeleport.id = "input-name-map-teleport";
inputNameMapTeleport.min = 1;
inputNameMapTeleport.max = 255;
inputNameMapTeleport.defaultValue = 'NameMap';

export const selectMesh = document.createElement('select');
selectMesh.classList.add("select-mesh");
selectMesh.id = "select-mesh";
const jsonMash = getGlobalJsonMash();
for (const meshKey in  jsonMash) {
    const option = document.createElement('option');
    option.value = meshKey;
    option.text = jsonMash[meshKey]["name"];
    selectMesh.appendChild(option);
}
export const selectTelepor = document.createElement('select');
selectTelepor.classList.add("select-teleport");
selectTelepor.id = "select-teleport";
const optionTelepor = document.createElement('option');
optionTelepor.value = labelNewTeleportCordinates;
optionTelepor.text = labelNewTeleportCordinates;
selectTelepor.appendChild(optionTelepor);

export const checkBoxIsBlockCube = document.createElement('input');
checkBoxIsBlockCube.classList.add("checkbox-is-block-cube");
checkBoxIsBlockCube.type = "checkbox";
checkBoxIsBlockCube.id = "checkbox-is-block-cube";
checkBoxIsBlockCube.checked = false;

export const checkBoxIsTelepot = document.createElement('input');   
checkBoxIsTelepot.classList.add("checkbox-is-telepot");
checkBoxIsTelepot.type = "checkbox";
checkBoxIsTelepot.id = "checkbox-is-telepot";
checkBoxIsTelepot.checked = false;

export const inputDestinationLayer = document.createElement('input');
inputDestinationLayer.classList.add("input-destination-layer");
inputDestinationLayer.type = "number";
inputDestinationLayer.id = "input-destination-layer";
inputDestinationLayer.min = 0;
inputDestinationLayer.value = 0;
inputDestinationLayer.defaultValue = 0;

export const inputDestinationX = document.createElement('input');
inputDestinationX.classList.add("input-destination-x");
inputDestinationX.type = "number";
inputDestinationX.id = "input-destination-x";
inputDestinationX.min = 0;
inputDestinationX.value = 0;
inputDestinationX.defaultValue = 0;

export const inputDestinationY = document.createElement('input');
inputDestinationY.classList.add("input-destination-y");
inputDestinationY.type = "number";
inputDestinationY.id = "input-destination-y";
inputDestinationY.min = 0;
inputDestinationY.value = 0;
inputDestinationY.defaultValue = 0;

export const selectEvent = document.createElement('select');
selectEvent.classList.add("select-event");
selectEvent.id = "select-event";
const optionEvent = document.createElement('option');
optionEvent.value = labelNewEvent;
optionEvent.text = labelNewEvent;
selectEvent.appendChild(optionEvent);

export const checkBoxIsEvent = document.createElement('input');   
checkBoxIsEvent.classList.add("checkbox-is-event");
checkBoxIsEvent.type = "checkbox";
checkBoxIsEvent.id = "checkbox-is-event";
checkBoxIsEvent.checked = false;

export const inputEventName = document.createElement('input');
inputEventName.classList.add("input-event-name");
inputEventName.type = "text";
inputEventName.id = "input-event-name";
inputEventName.min = 1;
inputEventName.max = 255;
inputEventName.defaultValue = 'NameEvent';

export const inputUpLoadMap = document.createElement('input');
inputUpLoadMap.classList.add('input-upload-map');
inputUpLoadMap.type ='file';
inputUpLoadMap.id = 'input-upload-map';

export const selectPlayer = document.createElement('select');
selectPlayer.classList.add("select-player");
selectPlayer.id = "select-player";
const optionEvent = document.createElement('option');
optionEvent.value = labelNewPlayer;
optionEvent.text = labelNewPlayer;
selectPlayer.appendChild(optionEvent);

export const checkBoxIsPlayer = document.createElement('input');   
checkBoxIsPlayer.classList.add("checkbox-is-player");
checkBoxIsPlayer.type = "checkbox";
checkBoxIsPlayer.id = "checkbox-is-player";
checkBoxIsPlayer.checked = false;

export const inputPlayerName = document.createElement('input');
inputPlayerName.classList.add("input-Player-name");
inputPlayerName.type = "text";
inputPlayerName.id = "input-Player-name";
inputPlayerName.min = 1;
inputPlayerName.max = 255;
inputPlayerName.defaultValue = 'NamePlayer';


/////////////////////////////////////////////////////////||
//                     Sezione Bottoni                   ||
/////////////////////////////////////////////////////////||

export const bottonCreateMap = document.createElement('button');
bottonCreateMap.classList.add("botton-create-map");
bottonCreateMap.id = "botton-create-map";
bottonCreateMap.type = "button";
bottonCreateMap.innerText = labelGenerateMap;

export const bottonDownloadJsonMap = document.createElement('button');
bottonDownloadJsonMap.classList.add("botton-create-map");
bottonDownloadJsonMap.id = "botton-download-json-map";
bottonDownloadJsonMap.type = "button";
bottonDownloadJsonMap.innerText = labelDownloadMap;

export const bottonAddTelepot = document.createElement('button');
bottonAddTelepot.classList.add("botton-add-telepot");
bottonAddTelepot.id = "botton-add-telepot";
bottonAddTelepot.type = "button";
bottonAddTelepot.innerText = labelBottonAddTeleportCube

export const bottonRemoveTelepot = document.createElement('button');
bottonRemoveTelepot.classList.add("botton-remove-telepot");
bottonRemoveTelepot.id = "botton-remove-telepot";
bottonRemoveTelepot.type = "button";
bottonRemoveTelepot.innerText = labelBottonRemoveTeleportCube;

export const bottonAddEvent = document.createElement('button');
bottonAddEvent.classList.add("botton-add-event");
bottonAddEvent.id = "botton-add-event";
bottonAddEvent.type = "button";
bottonAddEvent.innerText = labelBottonAddEvent

export const bottonRemoveEvent= document.createElement('button');
bottonRemoveEvent.classList.add("botton-remove-event");
bottonRemoveEvent.id = "botton-remove-event";
bottonRemoveEvent.type = "button";
bottonRemoveEvent.innerText = labelBottonRemoveEvent;

export const bottonUpLoadMap = document.createElement('button');
bottonUpLoadMap.classList.add("botton-load-map");
bottonUpLoadMap.id = "botton-load-map";
bottonUpLoadMap.type = "button";
bottonUpLoadMap.innerText = labelUpLoadMap;

export const bottonYes = document.createElement('button');
bottonYes.classList.add('botton-yes');
bottonYes.type = 'button';
bottonYes.innerText = labelYes;

export const bottonNo = document.createElement('button');
bottonNo.classList.add('botton-no');
bottonNo.type = 'button';
bottonNo.innerText = labelNo;

export const bottonAddPlayer = document.createElement('button');
bottonAddPlayer.classList.add("botton-add-player");
bottonAddPlayer.id = "botton-add-player";
bottonAddPlayer.type = "button";
bottonAddPlayer.innerText = labelBottonAddPlayerCube

export const bottonRemovePlayer = document.createElement('button');
bottonRemovePlayer.classList.add("botton-remove-player");
bottonRemovePlayer.id = "botton-remove-player";
bottonRemovePlayer.type = "button";
bottonRemovePlayer.innerText = labelBottonRemovePlayerCube;

////////////////////////////////////////////////////////////||
//                     Sezione Div                          ||
////////////////////////////////////////////////////////////||

export const divToolsTelepot = document.createElement('div');
divToolsTelepot.classList.add("d-flex", "flex-column");
divToolsTelepot.id = "div-tools-telepot";

export const divToolsEvent = document.createElement('div');
divToolsEvent.classList.add("d-flex", "flex-column");
divToolsEvent.id = "div-tools-event";

export const divToolsPlayers = document.createElement('div');
divToolsPlayers.classList.add("d-flex", "flex-column");
divToolsPlayers.id = "div-tools-players";

export const  divModalUploadMap = document.createElement('div');
divToolsEvent.classList.add("d-flex", "flex-column");
divToolsEvent.id = "div-tools-upload-map";

export const divModalYesOrNo = document.createElement('div');
divModalYesOrNo.classList.add("d-flex", "flex-column");
divModalYesOrNo.id = 'div-tools-modal-yes-or-no';

////////////////////////////////////////////////////////////||
//                Sezione Unordered List                    ||
////////////////////////////////////////////////////////////||

////////////////////////////////////////////////////////////||
//                  Sezione Paragraf                        ||
////////////////////////////////////////////////////////////||
export const pYesOrNoUploadMap = document.createElement('p');
pYesOrNoUploadMap.innerHTML = labelYesOrNoUpladMap;
