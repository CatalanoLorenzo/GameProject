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
            labelSelectInputEvent,
            selectEvent,
            labelInputEventName,
            inputEventName,
            bottonAddEvent,
            bottonRemoveEvent
        } 
from './tools.js';

import  {
            labelNewEvent
        }
from "./labelTextIta.js";

/////////////////////////////////////////////////////////||
//                    Sezione Funzioni                   ||
/////////////////////////////////////////////////////////||
/**updateIsEventCube metodo che serve ad abilitare un evento sul JSON di un cubo 
 * e a far partire il render dei tool per l'evento
 * 
 * @param {event} ev 
 * @param {JSON} cubeJson 
 */
export function updateIsEventCube(ev, cubeJson){
    const isEventCube = ev.target.checked;
    let globalJSONMap = getGlobalJSONMap();
    let layer = globalJSONMap['map'][`${cubeJson.z}`];
    if (layer && layer[cubeJson.IdCube]) {
        layer[cubeJson.IdCube].isEvent = isEventCube;
        setGlobalJSONMap(globalJSONMap);
        if (isEventCube) {
            renderEventSet(cubeJson.event);
        }else{            
            const divToolsEvent = document.getElementById('div-tools-event');
            divToolsEvent.innerHTML = '';
        }
        updateMap();
    } else {
        console.error(`Cubo con ID ${cubeJson.IdCube} non trovato nel layer L${cubeJson.z}`);
    }
    console.log(`Aggiornamento isEventCube del cubo ${cubeJson.IdCube} a ${isEventCube}`);
}
/**renderEventSet visualizza i campi di input e i bottoni per la gestione dei eventi . 
 * Se il cubo è un evento, vengono creati e popolati i campi di 
 * input con i valori corrispondenti all'evento. 
 * 
 * @param {JSON} eventJson 
 */
export function renderEventSet(eventJson){
    const divToolsEvent = document.getElementById('div-tools-event');
    divToolsEvent.innerHTML = '';
    selectEvent.onchange = function() {updateValueInputEvent()};
    const arrayOptionsEvent = Array.from(selectEvent.options);
    arrayOptionsEvent.filter(option => option.value !== labelNewEvent).forEach(option => selectEvent.removeChild(option));
    divToolsEvent.appendChild(labelSelectInputEvent);
    divToolsEvent.appendChild(selectEvent);
    if(Object.keys(eventJson.listEvent).length > 0){
        Object.values(eventJson.listEvents).forEach(event => {
            const optionEvent = document.createElement('option');
            optionEvent.value = `${event["name"]}`;
            optionEvent.text =  `${event["name"]}`;
            selectEvent.appendChild(optionEvent);
        });
    }
    divToolsEvent.appendChild(labelInputEventName);
    divToolsEvent.appendChild(inputEventName);
    bottonAddEvent.onclick = function() {addEventCube(eventJson)};
    divToolsEvent.appendChild(bottonAddEvent);
    bottonRemoveEvent.onclick = function() {removeEventCube(eventJson)};
    divToolsEvent.appendChild(bottonRemoveEvent);
}
/**addEventCube aggiunge un evento alle lista eventi del cubo 
 * in base ai valori inseriti nei campi di input e alla selezione effettuata nell'elemento select.
 * Se viene selezionata l'opzione "labelNewEvent", viene creato un nuovo evento 
 * con i valori inseriti nei campi di input e aggiunto alle lista eventi del cubo. 
 * Viene inoltre aggiunta una nuova opzione all'elemento select per il nuovo evento. 
 * 
 * @param {JSON} eventJson 
 */
export function addEventCube(eventJson){
console.log("Aggiunta Evento al Cubo");
    const SelectEvent = document.getElementById('select-event');
    const inputNameEvent = document.getElementById('input-event-name');
    console.log("Valore Nome Evento : " + inputNameEvent.value);
    console.log("Valore Select : " + SelectEvent.value);
    const newEvent = {
        name: inputNameEvent.value
    };
    if (SelectEvent.value === labelNewEvent) {
        eventJson.listEvent [newEvent.name] = newEvent;
        const optionEvent = document.createElement('option');
        optionEvent.value = `${newEvent.name}`;
        optionEvent.text = `${newEvent.name}`;
        SelectEvent.appendChild(optionEvent);
    }else{
        const EventName = SelectEvent.value;
        delete eventJson.listEvent[EventName];
        const optionEvent = Array.from(SelectEvent.options).find(option => option.value === SelectEvent.value);
        if (optionEvent) {
            SelectEvent.removeChild(optionEvent);
        }
        eventJson.listEvent[newEvent.name] = newEvent;
        const optionEventNew = document.createElement('option');
        optionEventNew.value = `${newEvent.name}`;
        optionEventNew.text = `${newEvent.name}`;
        SelectEvent.appendChild(optionEventNew);
    }
       console.log(eventJson);

}
/**removeEventCube rimuove un evento dalla lista eventi del cubo 
 * in base alla selezione effettuata nell'elemento select.
 * Se viene selezionata un'opzione diversa da "labelNewEvent", l'evento 
 * corrispondente alla selezione viene rimosso dalla lista eventi del cubo 
 * e l'opzione corrispondente viene rimossa dall'elemento select.
 * 
 * @param {JSON} eventJson 
 */
export function removeEventCube(eventJson){
   console.log("Rimozione Evento dal Cubo");
    const SelectEvent = document.getElementById('select-event');
    if (SelectEvent.value !== labelNewEvent) {
        const EventName = SelectEvent.value;
        delete eventJson.listEvent[EventName];
        const optionEvent = Array.from(SelectEvent.options).find(option => option.value === SelectEvent.value);
        if (optionEvent) {
            SelectEvent.removeChild(optionEvent);
        }

    }
    console.log(eventJson);
    
}
/**updateValueInputEvent aggiorna i campi di input per l'evento in base alla selezione effettuata nell'elemento select. 
 * Se viene selezionata un'opzione diversa da "labelNewEvent", i campi 
 * di input vengono popolati con i valori corrispondenti dell'evento selezionato. 
 * Se viene selezionata l'opzione "labelNewEvent", i campi 
 * di input vengono resettati o lasciati vuoti per consentire l'inserimento di un nuovo evento.
 */
export function updateValueInputEvent( ){
    const SelectTeleport = document.getElementById('select-event');
    const inputNameEvent = document.getElementById('input-event-name');
    if (SelectTeleport.value !== labelNewEvent) {
        inputNameEvent.value = [SelectTeleport.value];
    }
}