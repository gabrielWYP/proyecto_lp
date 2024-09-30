import { useState, useEffect } from 'react';
import './App.css';
import {Grilla} from './components/Grilla';
import {Cuadro} from './components/Cuadro'
import BFS from './logic/BFS';

function App() {
  const [mapa, setMapa] = useState(Array.from({ length: 6 }, () => Array(12).fill(false)));
  const [modo,setModo] = useState("Modo-Juego")
  const [origen, setOrigen] = useState(null)
  const [destino, setDestino] = useState(null)

  const resetMapa = () => {
    setMapa(Array.from({ length: 6 }, () => Array(12).fill(false)));
    setOrigen(null)
    setDestino(null)
  };

  const updateIzq = (rowIndex, colIndex) => {
    const newMapa = mapa.map((fila, i) => 
      fila.map((celda, j) => (i === rowIndex && j === colIndex ? true : celda))
    );
    setMapa(newMapa);
  };

  const updateDer = (rowIndex, colIndex) => {
    const newMapa = mapa.map((fila, i) => 
      fila.map((celda, j) => (i === rowIndex && j === colIndex ? false : celda))
    );
    setMapa(newMapa);
  };

  const updateTrack = (camino) => {
    const newMapa = mapa.map((fila, i) =>
      fila.map((celda, j) => {
        const inPath = camino.find(cell => cell.row === i && cell.col === j);
        return inPath ? "T" : celda;
      })
    );
    setMapa(newMapa);
  };

  const selOrigen = (rowIndex, colIndex) => {
    if (!mapa[rowIndex][colIndex]) {
      setOrigen({row : rowIndex, col : colIndex})
      setDestino(null)
    }
  }

  const selDestino = (rowIndex, colIndex) => {
    mapa[rowIndex][colIndex] === false && origen != null && !(origen.row === rowIndex && origen.col === colIndex) ? setDestino({row: rowIndex, col:colIndex}) : alert("Seleccione una casilla valida")
  }


  const handleKeyPress = (event) => {
    switch(event.key) {
      case "Control":
        setModo((prevModo) =>
          prevModo === "Modo-Juego" ? "Modo-Edicion" : "Modo-Juego"
        )
        break;
      case "a":
        alert("Has presionado A")
        break;
      case "Escape":
        resetMapa();
        setOrigen(null);
        setDestino(null);
        break;
      case " ":
        if (origen && destino) {
          const camino = BFS(origen.row, origen.col, destino.row, destino.col, 6, 12, mapa);
          if (camino) {
            updateTrack(camino);
          } else {
            alert("No se encontró un camino");
          }
        }
        break;
      case "Enter":
        null
        break;
      default:
        null
    }
};

useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
        window.removeEventListener('keydown', handleKeyPress);
    };
}, [origen,destino,mapa]);

  return (
    <main className='path'>
      <div className="header-container">
        <h1 className='titulo'>Pathfinding</h1>
        <button onClick={resetMapa}>Reset del Mapa</button>
        <Cuadro modo={modo}>
          {modo}
        </Cuadro>
      </div>
      <section className='mapa'>
        {
          mapa.map((fila, rowIndex) => (
            fila.map((celda, colIndex) => (
              <Grilla
                key={`${rowIndex}-${colIndex}`}
                index={`${rowIndex}-${colIndex}`}
                updateIzq={updateIzq}
                updateDer={updateDer}
                rowIndex={rowIndex}
                colIndex={colIndex}
                isSelected={celda}
                modo={modo}
                selOrigen = {selOrigen}
                selDestino = {selDestino}
                origen ={origen}
                destino={destino}
              >
                {celda ? "X" : ""}
              </Grilla>
            ))
          ))
        }
      </section>
    </main>
  );
}

export default App;