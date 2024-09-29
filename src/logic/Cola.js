 class Cola {
    constructor() {
        this.cola = []
    }

    encolar(elemento) {
        this.cola.push(elemento);
        return this.cola;
    }

    desencolar() {
        return this.cola.shift();
    }

    mirar() {
        return this.cola[0];
    }

    size() {
        return this.cola.length;
    }
    
    esVacia() {
        return this.cola.length === 0;
    }

    print(){
        return this.cola;
    }

}

export default Cola;

