const jsonMashup = await (await fetch(new URL('./mashMap.json', import.meta.url))).json();
let globalJsonMash = jsonMashup;
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
export function getCubeJsonSelectedById(id){
    const match = id.match(/z([^-]+)-/);
    const layer = match ? match[1] : null;
    return globalJSONMap['map'][layer][id] ;
}
export function getGlobalJsonMash(){
    return globalJsonMash;
}
export function getValueInput(){
    const x = parseInt(document.getElementById('input-row-map')?.value ?? 0);
    const y = parseInt(document.getElementById('input-col-map')?.value ?? 0);
    const z = parseInt(document.getElementById('input-height-map')?.value ?? 0);
    const nameMap = document.getElementById('input-NameMap-map')?.value || '';
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