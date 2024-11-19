import PriorityQueue from "./ColaPrio.js";
import Node from "./Node.js";

// Función principal FDS
function FDS(rowStart, colStart, rowEnd, colEnd, R, C, matriz) {
    // Crear nodos en la matriz, omitiendo los obstáculos
    const grid = Array.from(Array(R), (_, x) => Array(C).fill(null).map((_, y) => matriz[x][y] === false ? new Node(x, y) : null));

    const start = grid[rowStart][colStart];
    const goal = grid[rowEnd][colEnd];

  
  // Verificar que inicio y objetivo no sean obstáculos
    if (!start || !goal) return null;
    const openList = new PriorityQueue();
    goal.totalCost = 0;
    openList.enqueue(goal);

    while (!openList.isEmpty()) {
        const current = openList.dequeue(); 
        // Construir y retornar el camino óptimo
        if (current === start) {
            return constructPath(start); 
        }

        current.tag = 'CLOSED';

        // Expande los vecinos del nodo actual
        for (const neighbor of getNeighbors(current, grid, R, C)) {
            if (neighbor.tag === 'CLOSED') continue; // Ignorar nodos cerrados

            const newCost = current.totalCost + 1; // Costo de moverse a un vecino accesible

            if (neighbor.tag === 'NEW' || newCost < neighbor.totalCost) {
                neighbor.totalCost = newCost;
                neighbor.heuristic = newCost + heuristic(neighbor, goal);
                neighbor.backPointer = current; 

                if (neighbor.tag === 'NEW') {
                    neighbor.tag = 'OPEN';
                    openList.enqueue(neighbor);
                } 
            }
        }
    }

    return null; 
}

// Funcion auxiliar para calcular la heurística (distancia Manhattan)
function heuristic(node, goal) {
    return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
}

// Funcion para obtener vecinos validos en direcciones derecha izq arriba abajo
function getNeighbors(node, grid, R, C) {
    const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ];
    const neighbors = [];

    for (const dir of directions) {
        const nx = node.x + dir.x;
        const ny = node.y + dir.y;

        
        if (nx >= 0 && nx < R && ny >= 0 && ny < C && grid[nx][ny] !== null) {
            neighbors.push(grid[nx][ny]);
        }
    }

    return neighbors;
}

//funcion para contruir el camni final (return principal de la funcion FDS)

function constructPath(goal) {
    const path = [];
    let current = goal;

    while (current !== null) {
        path.push({row: current.x,col:current.y}); 
        current = current.backPointer;
    }

    return path.reverse();
}

export default FDS;
