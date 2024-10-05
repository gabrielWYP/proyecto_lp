

export const Grilla = ({updateIzq, updateDer, children, isSelected,rowIndex,colIndex, modo, selOrigen, selDestino,  origen, destino}) => {

    const getClassName = () => {
        if (origen && origen.row === rowIndex && origen.col === colIndex) {
          return "grilla origen"; // Estilo para origen
        }
        if (destino && destino.row === rowIndex && destino.col === colIndex) {
          return "grilla destino"; // Estilo para destino
        }
        if (isSelected === "T") {
          return "grilla track"
        } else if (isSelected === true) {
          return "grilla selected"
        } else {
          return "grilla"
        }
      };

    const handleClickIzq = () => {
        if (modo === "Modo-Edicion" && (!origen || (rowIndex !== origen.row || colIndex !== origen.col)) && (!destino || (rowIndex !== destino.row || colIndex !== destino.col))) {
            updateIzq(rowIndex,colIndex)
        } else if ( modo === "Modo-Juego") {
            if (!origen) {
                selOrigen(rowIndex,colIndex)
            } else if (!destino) {
                selDestino(rowIndex,colIndex)
            }
        }
    }
    const handleClickDer = (event) => {
        event.preventDefault()
        modo === "Modo-Edicion" ? updateDer(rowIndex,colIndex) : null;
    }
    return (
        <div onClick={handleClickIzq} onContextMenu={handleClickDer} className= {getClassName()}>
        {children}
      </div>
    )
}