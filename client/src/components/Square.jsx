import { useState } from "react"
import { useSelector } from "react-redux"

const Square = (props) => {
  const game = useSelector((state) => state.game)
  const [invalidClick, setInvalidClick] = useState(null)
  
  let background = "gameboard__square_background_valid"
  if (props.value) {
    background = "gameboard__square_background_invalid"
  }

  const handleClick = () => {
    if (game.isActive) {
      if (props.value) {
        setInvalidClick("gameboard__square_invalid_click")
        setTimeout(() => setInvalidClick(null), 500)
      } else {
        props.handleMove(props.squareNumber)
      }
    }
  }


  return (
    <div className={`gameboard__square ${background} ${invalidClick}`} onClick={handleClick}>
      {props.value}
    </div>
  )
}

export default Square