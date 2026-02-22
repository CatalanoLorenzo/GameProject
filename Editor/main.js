import { renderMap } from './renderMap.js';
import {
	labelinputRow,
	inputRow,
	labelinputCol,
	inputCol,
	labelinputHeight,
	inputHeight,
	labelinputNameMap,
	inputNameMap,
	bottonCreateMap,
	
} from './tools.js';


const map = document.getElementById('map');
const tools = document.getElementById('tools');

// Monta gli elementi di controllo nella sidebar strumenti
tools.appendChild(labelinputRow);
tools.appendChild(inputRow);
tools.appendChild(labelinputCol);
tools.appendChild(inputCol);
tools.appendChild(labelinputHeight);
tools.appendChild(inputHeight);
tools.appendChild(labelinputNameMap);
tools.appendChild(inputNameMap);
bottonCreateMap.onclick = () => renderMap(map, tools);
tools.appendChild(bottonCreateMap);

// Il bottone per il download verrà aggiunto da renderMap

