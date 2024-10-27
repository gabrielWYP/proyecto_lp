import { useState, useEffect } from 'react';
import './App.css';
import {Grilla} from './components/Grilla';
import {Cuadro} from './components/Cuadro'
import BFS from './logic/BFS';

function App() {

  //Estados para el mapa, modo, origen, destino y camino actual
  const [rows, setRows] = useState(7);
  const [cols, setCols] = useState(14);
  const [mapa, setMapa] = useState(Array.from({ length: rows }, () => Array(cols).fill(false)));
  const [modo,setModo] = useState("Modo-Juego")
  const [origen, setOrigen] = useState(null)
  const [destino, setDestino] = useState(null)
  const [caminoActual, setCaminoActual] = useState([]);

  //Funcion para resetear mapa

  const resetMapa = () => {
    setMapa(Array.from({ length: rows }, () => Array(cols).fill(false)));
    setOrigen(null)
    setDestino(null)
    setCaminoActual([]);
  };

  //Funciones de actualizacion para el modo de edicion
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

  //Funcion para actualizar el camino

  const updateTrack = (camino, clear = false) => {
    const newMapa = mapa.map((fila, i) =>
      fila.map((celda, j) => {
        const inPath = camino.find(cell => cell.row === i && cell.col === j);
        return inPath ? (clear ? false : "T") : celda;
      })
    );
    setMapa(newMapa);
  };

  //Funciones para seleccionar origen y destino

  const selOrigen = (rowIndex, colIndex) => {
    if (!mapa[rowIndex][colIndex]) {
      setOrigen({row : rowIndex, col : colIndex})
      setDestino(null)
    }
  }

  const selDestino = (rowIndex, colIndex) => {
    mapa[rowIndex][colIndex] === false && origen != null && !(origen.row === rowIndex && origen.col === colIndex) ? setDestino({row: rowIndex, col:colIndex}) : alert("Seleccione una casilla valida")
  }


  //Manejo de eventos de teclado
  const handleKeyPress = (event) => {
    switch(event.key) {
      case "Control":
        setModo((prevModo) =>
          prevModo === "Modo-Juego" ? "Modo-Edicion" : "Modo-Juego"
        )
        break;
      case "Escape":
        resetMapa();
        setOrigen(null);
        setDestino(null);
        break;
      case " ":
        if (caminoActual.length > 0) {
          updateTrack(caminoActual, true); 
          setCaminoActual([]); 
        } else if (origen && destino) {
          const camino = BFS(origen.row, origen.col, destino.row, destino.col, rows, cols, mapa);
          if (camino) {
            updateTrack(camino);
            setCaminoActual(camino);
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

//Captura de eventos de teclado

useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
        window.removeEventListener('keydown', handleKeyPress);
    };
}, [origen,destino,mapa,caminoActual]);

//esto se produce cada que se actualice alguno de los estados de arriba


useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth * 0.75;
      const height = window.innerHeight * 0.75;

      const numCols = Math.floor(width / 100);
      const numRows = Math.floor(height / 100);
      console.log(numCols,numRows)


      //Nuevos estados
      setRows(numRows);
      setCols(numCols);

      setOrigen(null)
      setDestino(null)
      setCaminoActual([]);

      setMapa(Array.from({ length: numRows }, () => Array(numCols).fill(false)))

      //Para el display
      document.documentElement.style.setProperty('--numCols', numCols);
      document.documentElement.style.setProperty('--numRows', numRows);
    }
    handleResize();
    window.addEventListener('resize',handleResize);

    //Limpieza
    return () => window.removeEventListener('resize',handleResize);
}, []);
//Para evitar bucles, anade la lista vacia de dependencias



//Renderizado de la aplicacion
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