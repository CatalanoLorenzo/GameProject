import  { 
            getGlobalJSONMap,
            getglobalX,
            getglobalY,
            getglobalZ,
            getglobalNameMap,
            
            setglobalNameMap,
            setglobalY,
            setglobalZ,
            setGlobalJSONMap,
            getValueInput,
            
        }from './globalVariables.js';    

function createCube(){ 
    const divCube = document.createElement('div');
    divCube.id = `x${getglobalX()}y${getglobalY()}z${getglobalZ()}-L${getglobalZ()}-${getglobalNameMap()}`;
    divCube.defaultValue = 0;
    divCube.classList.add("cube");
    return divCube;
}

export function generateMap(map){ 
    map.innerHTML='';
    let y = getglobalY();
    let x = getglobalX();
    let nameMap = getglobalNameMap();
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
export function genetateJSONMap() {
    
    let JSONMap = [];
    let x = getglobalX();
    let y = getglobalY();
    let z = getglobalZ();
    let nameMap = getglobalNameMap();
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
    let globalNameMap = getglobalNameMap();
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