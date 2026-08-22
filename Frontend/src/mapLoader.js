import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const CUBE_SIZE = 1;

// Colore di riserva per ogni mashCode senza un modello 3d assegnato in mashMap.json.
const FALLBACK_COLORS = {
    mash0001: 0x4caf50, // Erba
    mash0002: 0x707070, // Strada
    mash0003: 0x2196f3, // Acqua
    mash0004: 0xe0c068, // Sabbia
    mash0005: 0x8d6e63, // Muro
    mash0006: 0xbdbdbd, // Pavimento
    mash0007: 0x795548  // Terreno
};

function colorForMashCode(mashCode) {
    if (FALLBACK_COLORS[mashCode] !== undefined) return FALLBACK_COLORS[mashCode];
    let hash = 0;
    for (let i = 0; i < mashCode.length; i++) hash = (hash * 31 + mashCode.charCodeAt(i)) | 0;
    return new THREE.Color(`hsl(${Math.abs(hash) % 360}, 60%, 50%)`).getHex();
}

const gltfLoader = new GLTFLoader();
const modelCache = new Map();

/**loadModelGeometry carica un file .glb da Frontend/public/models/ e ne estrae geometria e materiale
 * della prima mesh trovata nella scena. Ogni file viene caricato una sola volta e poi riusato per tutti
 * i cubi che condividono lo stesso mashCode, indipendentemente da quante istanze ne servano.
 *
 * @param {String} fileName
 * @returns {Promise<{geometry: THREE.BufferGeometry, material: THREE.Material}>}
 */
function loadModelGeometry(fileName) {
    if (!modelCache.has(fileName)) {
        modelCache.set(fileName, gltfLoader.loadAsync(`/models/${fileName}`).then((gltf) => {
            let found = null;
            gltf.scene.traverse((child) => {
                if (!found && child.isMesh) found = child;
            });
            return { geometry: found.geometry, material: found.material };
        }));
    }
    return modelCache.get(fileName);
}

/**loadMap carica una mappa esportata dall'Editor e ne costruisce la rappresentazione 3D.
 * Mapping assi (stile Minecraft, layer impilati in verticale): x->X, z (altezza/layer)->Y, y (profondita)->Z.
 * I cubi con la stessa mashCode sono raggruppati in un InstancedMesh per restare performanti su mappe grandi.
 * Se mashMap.json indica un "model" per quel mashCode viene caricato il .glb corrispondente da
 * Frontend/public/models/; altrimenti resta il cubo placeholder a colore piatto. I cubi con mashCode
 * 'mash0000' (nessuna mesh) vengono saltati.
 *
 * @param {String} nameMap - nome del file JSON in Frontend/public/maps/ (senza estensione)
 * @returns {Promise<THREE.Group>}
 */
export async function loadMap(nameMap) {
    const [mapJson, mashMap] = await Promise.all([
        fetch(`/maps/${nameMap}.json`).then((res) => res.json()),
        fetch('/mashMap.json').then((res) => res.json())
    ]);

    const cubesByMashCode = new Map();
    for (const layer of mapJson.map) {
        for (const cube of Object.values(layer)) {
            if (cube.mashCode === 'mash0000') continue;
            if (!cubesByMashCode.has(cube.mashCode)) cubesByMashCode.set(cube.mashCode, []);
            cubesByMashCode.get(cube.mashCode).push(cube);
        }
    }

    const group = new THREE.Group();
    const placeholderGeometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    const dummy = new THREE.Object3D();

    for (const [mashCode, cubes] of cubesByMashCode) {
        const modelFile = mashMap[mashCode]?.model;
        const { geometry, material } = modelFile
            ? await loadModelGeometry(modelFile)
            : { geometry: placeholderGeometry, material: new THREE.MeshStandardMaterial({ color: colorForMashCode(mashCode) }) };

        const instancedMesh = new THREE.InstancedMesh(geometry, material, cubes.length);

        cubes.forEach((cube, i) => {
            dummy.position.set(cube.x, cube.z, cube.y);
            dummy.rotation.set(
                THREE.MathUtils.degToRad(cube.rotation.x),
                THREE.MathUtils.degToRad(cube.rotation.z),
                THREE.MathUtils.degToRad(cube.rotation.y)
            );
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(i, dummy.matrix);
        });
        instancedMesh.instanceMatrix.needsUpdate = true;
        group.add(instancedMesh);
    }

    return group;
}
