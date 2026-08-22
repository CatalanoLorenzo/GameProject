import * as THREE from 'three';

const CUBE_SIZE = 1;

// Colore di riserva per ogni mashCode, in attesa di texture reali.
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

/**loadMap carica una mappa esportata dall'Editor e ne costruisce la rappresentazione 3D.
 * Mapping assi (stile Minecraft, layer impilati in verticale): x->X, z (altezza/layer)->Y, y (profondita)->Z.
 * I cubi con la stessa mashCode sono raggruppati in un InstancedMesh per restare performanti su mappe grandi.
 * I cubi con mashCode 'mash0000' (nessuna mesh) vengono saltati.
 *
 * @param {String} nameMap - nome del file JSON in Frontend/public/maps/ (senza estensione)
 * @returns {Promise<THREE.Group>}
 */
export async function loadMap(nameMap) {
    const mapJson = await (await fetch(`/maps/${nameMap}.json`)).json();

    const cubesByMashCode = new Map();
    for (const layer of mapJson.map) {
        for (const cube of Object.values(layer)) {
            if (cube.mashCode === 'mash0000') continue;
            if (!cubesByMashCode.has(cube.mashCode)) cubesByMashCode.set(cube.mashCode, []);
            cubesByMashCode.get(cube.mashCode).push(cube);
        }
    }

    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    const dummy = new THREE.Object3D();

    for (const [mashCode, cubes] of cubesByMashCode) {
        const material = new THREE.MeshStandardMaterial({ color: colorForMashCode(mashCode) });
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
