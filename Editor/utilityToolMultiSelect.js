/////////////////////////////////////////////////////////||
//                     Sezione Import                    ||
/////////////////////////////////////////////////////////||

import  {
            getGlobalJSONMap,
            setGlobalJSONMap,
            getGlobalSelectZ
        }
from './globalVariables.js';

import  {
            updateMap
        }
from './updateMap.js';

import  {
            divModalMultiSelect,
            labelMultiSelectCount,
            labelSelectMeshMulti,
            selectMeshMulti,
            labelCheckBoxIsBlockCubeMulti,
            checkBoxIsBlockCubeMulti,
            labelinputRotationXMulti,
            inputRotationXMulti,
            labelinputRotationYMulti,
            inputRotationYMulti,
            labelinputRotationZMulti,
            inputRotationZMulti,
            bottonChiudiMultiSelect
        }
from './tools.js';

import  {
            labelCubiSelezionati
        }
from './labelTextIta.js';

/////////////////////////////////////////////////////////||
//                    Sezione Stato                      ||
/////////////////////////////////////////////////////////||

// Distanza minima (in pixel) da percorrere prima di considerare l'interazione un trascinamento
// e non un semplice click: un click reale ha sempre un minimo tremore della mano, senza questa
// soglia anche 1px di movimento verso la cella adiacente veniva interpretato come inizio selezione.
const DRAG_THRESHOLD_PX = 6;

let isDragging = false;
let hasCrossedThreshold = false;
let dragStartX = null;
let dragStartY = null;
let dragStartClientX = null;
let dragStartClientY = null;
let selectedIds = new Set();

/////////////////////////////////////////////////////////||
//                    Sezione Funzioni                   ||
/////////////////////////////////////////////////////////||
/**initMultiSelect collega, una sola volta, gli eventi del mouse sul div "map" (delega di eventi,
 * cosi funziona anche sui cubi ricreati ad ogni updateMap) e su document per intercettare il rilascio
 * del tasto anche fuori dalla griglia.
 */
export function initMultiSelect(){
    const map = document.getElementById('map');
    map.addEventListener('mousedown', (e) => {
        const cube = e.target.closest('.cube');
        if (!cube) return;
        e.preventDefault();
        isDragging = true;
        hasCrossedThreshold = false;
        dragStartX = parseInt(cube.dataset.x);
        dragStartY = parseInt(cube.dataset.y);
        dragStartClientX = e.clientX;
        dragStartClientY = e.clientY;
    });
    map.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        if (!hasCrossedThreshold) {
            const dx = e.clientX - dragStartClientX;
            const dy = e.clientY - dragStartClientY;
            if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD_PX) return;
            hasCrossedThreshold = true;
        }
        const cube = e.target.closest('.cube');
        if (!cube) return;
        updateSelection(parseInt(cube.dataset.x), parseInt(cube.dataset.y));
    });
    document.addEventListener('mouseup', () => {
        endSelection();
    });
}

function updateSelection(x, y){
    if (!isDragging) return;
    const minX = Math.min(dragStartX, x);
    const maxX = Math.max(dragStartX, x);
    const minY = Math.min(dragStartY, y);
    const maxY = Math.max(dragStartY, y);

    selectedIds = new Set();
    document.querySelectorAll('#map .cube').forEach(cube => {
        const cx = parseInt(cube.dataset.x);
        const cy = parseInt(cube.dataset.y);
        const isInside = cx >= minX && cx <= maxX && cy >= minY && cy <= maxY;
        cube.classList.toggle('cube-selected', isInside);
        if (isInside) selectedIds.add(cube.id);
    });
}

function endSelection(){
    if (!isDragging) return;
    isDragging = false;
    if (!hasCrossedThreshold) return;
    if (selectedIds.size > 1) {
        renderMultiSelectPanel();
    } else {
        clearSelection();
    }
}

/**hasActiveMultiSelection indica se e' attualmente in corso una selezione multipla (pannello batch aperto).
 * Usata per evitare che il pannello del singolo cubo si apra sopra quello multiplo.
 */
export function hasActiveMultiSelection(){
    return selectedIds.size > 1;
}

/**clearSelection rimuove l'evidenziazione dai cubi, svuota la selezione e chiude il pannello multi-selezione. */
export function clearSelection(){
    document.querySelectorAll('#map .cube-selected').forEach(c => c.classList.remove('cube-selected'));
    selectedIds.clear();
    const tools = document.getElementById('tools');
    if (tools.contains(divModalMultiSelect)) {
        tools.removeChild(divModalMultiSelect);
    }
}

function reapplyHighlight(){
    document.querySelectorAll('#map .cube').forEach(cube => {
        cube.classList.toggle('cube-selected', selectedIds.has(cube.id));
    });
}

/**applyToSelection applica una modifica a tutti i cubi selezionati sul layer corrente, aggiorna il JSON globale,
 * ridisegna la mappa e ripristina l'evidenziazione (che updateMap altrimenti cancellerebbe).
 *
 * @param {Function} mutator - funzione che riceve il singolo cubo JSON e lo modifica
 */
function applyToSelection(mutator){
    const globalJSONMap = getGlobalJSONMap();
    const layer = globalJSONMap['map'][`${getGlobalSelectZ()}`];
    selectedIds.forEach(id => {
        if (layer && layer[id]) {
            mutator(layer[id]);
        }
    });
    setGlobalJSONMap(globalJSONMap);
    updateMap();
    reapplyHighlight();
}

/**renderMultiSelectPanel mostra nel pannello strumenti i controlli per applicare in blocco mesh,
 * calpestabilita e rotazione a tutti i cubi attualmente selezionati.
 */
function renderMultiSelectPanel(){
    divModalMultiSelect.innerHTML = '';

    labelMultiSelectCount.innerText = `${labelCubiSelezionati}${selectedIds.size}`;
    divModalMultiSelect.appendChild(labelMultiSelectCount);

    divModalMultiSelect.appendChild(labelSelectMeshMulti);
    selectMeshMulti.onchange = (ev) => {
        const newMashCode = ev.target.value;
        applyToSelection(cube => { cube.mashCode = newMashCode; });
    };
    divModalMultiSelect.appendChild(selectMeshMulti);

    divModalMultiSelect.appendChild(labelCheckBoxIsBlockCubeMulti);
    checkBoxIsBlockCubeMulti.onchange = (ev) => {
        const isBlockCube = ev.target.checked;
        applyToSelection(cube => { cube.isLooked = isBlockCube; });
    };
    divModalMultiSelect.appendChild(checkBoxIsBlockCubeMulti);

    divModalMultiSelect.appendChild(labelinputRotationXMulti);
    inputRotationXMulti.onchange = (ev) => {
        const value = parseFloat(ev.target.value) || 0;
        applyToSelection(cube => { cube.rotation.x = value; });
    };
    divModalMultiSelect.appendChild(inputRotationXMulti);

    divModalMultiSelect.appendChild(labelinputRotationYMulti);
    inputRotationYMulti.onchange = (ev) => {
        const value = parseFloat(ev.target.value) || 0;
        applyToSelection(cube => { cube.rotation.y = value; });
    };
    divModalMultiSelect.appendChild(inputRotationYMulti);

    divModalMultiSelect.appendChild(labelinputRotationZMulti);
    inputRotationZMulti.onchange = (ev) => {
        const value = parseFloat(ev.target.value) || 0;
        applyToSelection(cube => { cube.rotation.z = value; });
    };
    divModalMultiSelect.appendChild(inputRotationZMulti);

    bottonChiudiMultiSelect.onclick = () => clearSelection();
    divModalMultiSelect.appendChild(bottonChiudiMultiSelect);

    const tools = document.getElementById('tools');
    if (!tools.contains(divModalMultiSelect)) {
        tools.appendChild(divModalMultiSelect);
    }
}
