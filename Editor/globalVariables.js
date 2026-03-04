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
let globalSelectZ = 0;  
let isGeneratingMap = false; 


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
export function getIsGeneratingMap(){
    return isGeneratingMap;
}
export function getGlobalSelectZ(){
    return globalSelectZ;
}
export function getValueInput(){
    const x = parseInt(inputRow.value) ;
    const y = parseInt(inputCol.value) ;
    const z = parseInt(inputHeight.value) ;
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
export function setIsGeneratingMap() {
    isGeneratingMap = true;
}
export function setGlobalSelectZ(selectZ){
    globalSelectZ = selectZ;
}