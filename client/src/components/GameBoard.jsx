import Square from "./Square"

const GameBoard = () => {
  const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareNumber) => {
    let value = "X"
    const random = Math.random()
    if (random > .67) value = "Y"
    if (random < .33) value = null

    return <Square key={squareNumber} value={value}/>
  })

  return <div className="gameboard__container">{squares}</div>
}

export default GameBoard
