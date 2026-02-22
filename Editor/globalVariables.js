import  {
            inputRow,
            inputCol ,
            inputHeight,
            inputNameMap
        } from './tools.js';
let globalJSONMap = [];
let globalNameMap = '';
let globalX = 0;
let globalY = 0;
let globalZ = 0;    



export function getGlobalJSONMap(){
    return globalJSONMap;
}
export function getglobalX (){
    return globalX;
}
export function getglobalY (){
    return globalY;
}
export function getglobalZ (){
    return globalZ;
}
export function getglobalNameMap (){
    return globalNameMap;
}
export function getValueInput(){
    const x = parseInt(inputRow.value, 10) || 1;
    const y = parseInt(inputCol.value, 10) || 1;
    const z = parseInt(inputHeight.value, 10) || 1;
    const nameMap = inputNameMap.value || '';
    globalNameMap = nameMap;
    globalX = x;
    globalY = y;
    globalZ = z;
    console.log(globalX,globalY,globalZ,globalNameMap);
    
}
export function setglobalX(x){
    globalX = x;
}
export function setglobalY(y){
    globalY = y;
}
export function setglobalZ(z){
    globalZ = z;
}
export function setglobalNameMap(nameMap){
    globalNameMap = nameMap;
}   
export function setGlobalJSONMap(jsonMap) {
    globalJSONMap = jsonMap;
}