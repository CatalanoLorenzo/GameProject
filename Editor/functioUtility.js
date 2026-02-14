import { 
    labelinputRow, 
    inputRow, 
    labelinputCol, 
    inputCol ,
    labelinputHeight,
    inputHeight,
    bottonCreateMap} 
from './tools.js';
/**
 * 
 * 
 */
export function renderPage (tools){
    console.log("Start render Page");

    tools.appendChild(labelinputRow);
    tools.appendChild(inputRow);
    tools.appendChild(labelinputCol);
    tools.appendChild(inputCol);   
    tools.appendChild(labelinputHeight);
    tools.appendChild(inputHeight); 
    bottonCreateMap.onclick = function() {renderMap()};
    tools.appendChild(bottonCreateMap);

    console.log("Finish render Page");

}
export function renderMap(map){
    console.log("Generazione mappa inizio");
    getValueInput()
    console.log("Generazione mappa Fine");

}

function getValueInput(){

    let x = inputRow.value;
    let y = inputCol.value;
    let z = inputHeight.value;
    console.log("x: " + x + " y: " + y + " z: " + z);
}
