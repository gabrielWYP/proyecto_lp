import ColaPrio from "./ColaPrio.js";
import Celda from "./Celda.js";

function FocussedDStar(rowStart,colStart,rowEnd,colEnd,R,C,mapa){
    let openList = new ColaPrio();
    let start = new Celda(rowStart,colStart);
    let goal = new Celda(rowEnd,colEnd);
    
    goal.rhs,goal.g=0;
    
    openList.insertarOpenList(openlist,goal);

    const visited = Array.from({ length: R }, () => Array(C).fill(false));
    const path = Array.from({ length: R }, () => Array(C).fill(null));
    
    //holaa

    const DR = [-1, +1, 0, 0]; 
    const DC = [0, 0, +1, -1]; 

    while (!openList){
        let current= openList.desencolar();
        if (current.g >= current.rhs){
            current.g = current.rhs
            current.estado = true;
        }
        visited[current.x][current.y]=true;
        

    }


}


function insertarOpenList(openlist ,state ){
    if (openlist.esVacia()) {
        openlist.encolar(state);
    } else {
        let listaAux = new PriorityQueue();
        let estadoExistente = false;

        while (!openlist.esVacia()) {
            let stateaux = openlist.desencolar();
            if (stateaux === state) {
                estadoExistente = true; 
            }
            listaAux.encolar(stateaux);
        }
        while (!listaAux.esVacia()) {
            openlist.encolar(listaAux.desencolar());
        }
        if (!estadoExistente) {
            openlist.encolar(state);
            state.tag= 'OPEN';
        }
    }

}

function modifyCost(celda,newCost,openList){
    celda.g=newCost;
    insertarOpenList(openList,celda);

}

function explorarVecinos (state, DR, DC, path, visited, R, C){

    for ( let i = 0; i<4; i++){
        
        const movR = state.x + DR[i];
        const movC = state.y + DC[i];

        if ( movR >=0 && movR < R && movC >=0 && movC <C ){

            visited[state.x][state.y] = true;
            if( state.tag === 'NEW'){

                

            }


        }

    }


}

