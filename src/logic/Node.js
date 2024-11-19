class Node {
    constructor(x, y) {
        this.x = x; // posición en el eje X (fila)
        this.y = y; // posición en el eje Y (columna)
        this.heuristic = Infinity; // valor heurístico para el D* Focussed
        this.totalCost = Infinity; // costo total desde el inicio hasta el nodo
        this.backPointer = null; // referencia al nodo anterior
        this.tag = 'NEW'; // estado del nodo (NEW, OPEN, CLOSED)
    }
}

export default Node;