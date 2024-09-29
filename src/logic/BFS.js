import Cola from "./Cola.js"

function BFS(rowStart, colStart, rowEnd, colEnd, R, C, matriz) {
    const colaRow = new Cola();
    const colaCol = new Cola();
    
    let move_count = 0;
    let nodesLeftInLayer = 1;
    let nodesInNextLayer = 0;

    let reachEnd = false;

    const visited = Array.from({ length: R }, () => Array(C).fill(false));
    const path = Array.from({ length: R }, () => Array(C).fill(null));

    const DR = [-1, +1, 0, 0]; 
    const DC = [0, 0, +1, -1]; 

    colaRow.encolar(rowStart);
    colaCol.encolar(colStart);
    visited[rowStart][colStart] = true;

    while (!colaRow.esVacia()) {
        const currentRow = colaRow.desencolar();
        const currentCol = colaCol.desencolar();

        if (currentRow === rowEnd && currentCol === colEnd) {
            reachEnd = true; 
            break;
        }

        nodesInNextLayer = exploreNeighbours(
            currentRow, currentCol, matriz, DR, DC, path, R, C, visited, colaRow, colaCol, nodesInNextLayer
        );

        nodesLeftInLayer--;
        if (nodesLeftInLayer === 0) {
            move_count++;
            nodesLeftInLayer = nodesInNextLayer;
            nodesInNextLayer = 0;
        }
    }

    if (reachEnd) {
        console.log("Movimientos necesarios:", move_count);
        console.log("Camino más corto:", caminoDestino(rowEnd, colEnd, path));
        return caminoDestino(rowEnd, colEnd, path);
    } else {
        console.log("No hay camino disponible");
        return null;
    }
}

function exploreNeighbours(r, c, matriz, DR, DC, path, R, C, visited, colaRow, colaCol, nodesInNextLayer) {
    for (let i = 0; i < 4; i++) {
        const newRow = r + DR[i];
        const newCol = c + DC[i];

        if (newRow >= 0 && newRow < R && newCol >= 0 && newCol < C
            && !visited[newRow][newCol] && !matriz[newRow][newCol]) {
            visited[newRow][newCol] = true;
            colaRow.encolar(newRow);
            colaCol.encolar(newCol);
            nodesInNextLayer++;

            path[newRow][newCol] = { row: r, col: c };
        }
    }

    return nodesInNextLayer; 
}

function caminoDestino(row, col, path) {
    const camino = [];
    let current = { row, col };

    while (current) {
        camino.push(current);
        current = path[current.row][current.col];
    }

    return camino.reverse(); 
}
export default BFS;
