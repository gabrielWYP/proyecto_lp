class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(node) {
        this.nodes.push(node);
        this.nodes.sort((a, b) => a.heuristic - b.heuristic); // ordenar por heurística ascendente
    }

    dequeue() {
        return this.nodes.shift(); // extraer el nodo con menor heurística
    }

    isEmpty() {
        return this.nodes.length === 0;
    }
}
export default PriorityQueue;