import { useState } from "react"

const Square = (props) => {
  const [invalidClick, setInvalidClick] = useState(null)
  let background = "gameboard__square_background_valid"
  if (props.value) {
    background = "gameboard__square_background_invalid"
  }

  const handleClick = () => {
    if (props.value) {
      setInvalidClick("gameboard__square_invalid_click")
      setTimeout(() => setInvalidClick(null), 500)
    }
  }


  return (
    <div className={`gameboard__square ${background} ${invalidClick}`} onClick={handleClick}>
      {props.value}
    </div>
  )
}

export default Square