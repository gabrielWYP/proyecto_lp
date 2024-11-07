import Cola from "./Cola.js"

function BFS(rowStart, colStart, rowEnd, colEnd, R, C, matriz) {
    const start = performance.now()
    //Creacion de colas de prioridad para cada fila y columna
    const colaRow = new Cola();
    const colaCol = new Cola();
    
    //Variables para el control de movimientos, nodos en la capa actual y nodos en la siguiente capa

    let move_count = 0;
    let nodesLeftInLayer = 1;
    let nodesInNextLayer = 0;

    //Verificacion de finalizacion

    let reachEnd = false;

    //Creacion de matriz de visitados y matriz de camino

    const visited = Array.from({ length: R }, () => Array(C).fill(false));
    const path = Array.from({ length: R }, () => Array(C).fill(null));

    //Movimientos posibles en el tablero (no incluye diagonales)

    const DR = [-1, +1, 0, 0]; 
    const DC = [0, 0, +1, -1]; 

    //Inicializacion del algoritmo

    colaRow.encolar(rowStart);
    colaCol.encolar(colStart);
    visited[rowStart][colStart] = true;

    //Bucle principal

    while (!colaRow.esVacia()) {
        const currentRow = colaRow.desencolar();
        const currentCol = colaCol.desencolar();

        //Verificacion de llegada al destino

        if (currentRow === rowEnd && currentCol === colEnd) {
            reachEnd = true; 
            break;
        }

        //Exploracion de vecinos
        nodesInNextLayer = exploreNeighbours(
            currentRow, currentCol, matriz, DR, DC, path, R, C, visited, colaRow, colaCol, nodesInNextLayer
        );

        nodesLeftInLayer--;
        //Verificacion de nodos en la capa actual
        if (nodesLeftInLayer === 0) {
            move_count++;
            nodesLeftInLayer = nodesInNextLayer;
            nodesInNextLayer = 0;
        }
    }

    //Procedimiento si se encuentra el destino

    if (reachEnd) {
        const end = performance.now()
        console.log(`El algoritmo tomo ${end- start} milisegundos`)
        console.log("Movimientos necesarios:", move_count);
        console.log("Camino más corto:", caminoDestino(rowEnd, colEnd, path));
        return caminoDestino(rowEnd, colEnd, path);
    } else {
        console.log("No hay camino disponible");
        const end = performance.now()
        console.log(`El algoritmo tomo ${end- start} milisegundos`)
        return null;
    }
}

function exploreNeighbours(r, c, matriz, DR, DC, path, R, C, visited, colaRow, colaCol, nodesInNextLayer) {

    //Exploracion de los vecinos de la celda actual
    for (let i = 0; i < 4; i++) {
        const newRow = r + DR[i];
        const newCol = c + DC[i];

        //Verificacion de limites y obstaculos
        //Si se encuentra en los limites del tablero, si no ha sido visitada
        // y no es un obstaculo, se agrega a la cola de prioridad 

        if (newRow >= 0 && newRow < R && newCol >= 0 && newCol < C
            && !visited[newRow][newCol] && !matriz[newRow][newCol]) {
            visited[newRow][newCol] = true;
            colaRow.encolar(newRow);
            colaCol.encolar(newCol);
            nodesInNextLayer++;

            //Se agrega en la matriz del camino a la celda actual

            path[newRow][newCol] = { row: r, col: c };
        }
    }

    return nodesInNextLayer; 
}

function caminoDestino(row, col, path) {

    //Construccion del camino a partir de la matriz de camino
    const camino = [];
    let current = { row, col };
    //Se recorre la matriz de camino hasta llegar al origen (null camino)

    while (current) {
        //Se agrega el nodo actual al camino
        camino.push(current);
        //Se actualiza el nodo actual
        current = path[current.row][current.col];
    }

    return camino.reverse(); 
}
export default BFS;
