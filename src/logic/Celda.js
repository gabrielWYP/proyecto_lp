
export class Celda {
    constructor(x,y,g = Infinity,rhs = Infinity, destino) {
        this.x = x;
        this.y = y;
        this.g = g;
        this.rhs = rhs;
        this.neighbors = [];
        this.destino = destino;
    }

    heuristica(meta) {
        return Math.abs(this.x - meta.x) + Math.abs(this.y - meta.y);
    }

    compare(otraCelda) {
        return Math.min(this.g, this.rhs) + this.heuristica(this.destino) -
            (Math.min(otraCelda.g, otraCelda.rhs) + otraCelda.heuristica(this.destino));    
    }

}

export default Celda;