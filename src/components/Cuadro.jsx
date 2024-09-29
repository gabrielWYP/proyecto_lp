export const Cuadro = ({children, modo}) => {
    const className = modo

    return(
        <div className={className}>
          {children}
        </div>
    )
}