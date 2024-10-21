import Celda from './Celda';
export class PriorityQueue {
    constructor() {
        this.items = [];
    }

    // g=5,rhs =2

    encolar(state) {
        if (this.esVacia()) {
            this.items.push(state);  
        } else {
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (Math.min(state.g, state.rhs) < Math.min(this.items[i].g, this.items[i].rhs)) {
                    this.items.splice(i, 0, state);
                    added = true;
                    break;
                    
                }
            }
            if (!added) {
                this.items.push(state);  
            }
        }
    }

    desencolar() {
        return this.items.shift();  
    }

    esVacia() {
        return this.items.length === 0;
    }

    peek() {
        return !this.esVacia() ? this.items[0] : null;
    }
}