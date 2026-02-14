import { labelRow, labelCol ,labelHeight,labelGenerateMap} from "./labelTextIta.js";

export const labelinputRow = document.createElement('label');
labelinputRow.htmlFor = "input-row-map";
labelinputRow.innerText = labelRow;

export const inputRow = document.createElement('input');
inputRow.classList.add("input-row");
inputRow.type = "number";
inputRow.id = "input-row-map";
inputRow.min = 0;
inputRow.value = 0;
inputRow.defaultValue = 0;

export const labelinputCol = document.createElement('label');
labelinputCol.htmlFor = "input-col-map";
labelinputCol.innerText = labelCol;

export const inputCol = document.createElement('input');
inputCol.classList.add("input-col");
inputCol.type = "number";
inputCol.id = "input-col-map";
inputCol.min = 0;
inputCol.value = 0;
inputCol.defaultValue = 0;

export const labelinputHeight = document.createElement('label');
labelinputHeight.htmlFor = "input-height-map";
labelinputHeight.innerText = labelHeight;

export const inputHeight = document.createElement('input');
inputHeight.classList.add("input-height");
inputHeight.type = "number";
inputHeight.id = "input-height-map";
inputHeight.min = 0;
inputHeight.value = 0;
inputHeight.defaultValue = 0;

export const bottonCreateMap = document.createElement('button');
bottonCreateMap.classList.add("botton-create-map");
bottonCreateMap.id = "botton-create-map";
bottonCreateMap.type = "button";
bottonCreateMap.innerText = labelGenerateMap;
