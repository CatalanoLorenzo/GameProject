import{mountElementOnTools} from './functioUtility.js';
import{initMultiSelect} from './utilityToolMultiSelect.js';


const map = document.getElementById('map');
const tools = document.getElementById('tools');

// Monta gli elementi di controllo nella sidebar strumenti

mountElementOnTools(tools);
// Il bottone per il download verrà aggiunto da renderMap

// Abilita la selezione multipla dei cubi tenendo premuto il tasto sinistro del mouse
initMultiSelect();

