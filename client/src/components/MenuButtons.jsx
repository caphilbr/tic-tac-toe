import { useSelector, useDispatch } from "react-redux"
import { endGame } from "./../redux/actions.js"

const MenuButtons = (props) => {
  const game = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const round = game.rounds[game.rounds.length - 1]
  
  const newGameClick = () => {
    props.setShowNewGame(true)
  }

  const endGameClick = () => {
    dispatch(endGame())
  }

  return (
    <div className="button__container">
      {!game.isActive && (
        <span className="button__main_menu" onClick={newGameClick}>
          Start New Game
        </span>
      )}
      {game.isActive && round.isActive && (
        <span className="button__main_menu" onClick={endGameClick}>End Game</span>
      )}
      {game.isActive && !round.isActive && (
        <>
          <span className="button__main_menu" onClick={endGameClick}>End Game</span>
          <span className="button__main_menu">Next Round</span>
        </>
      )}
    </div>
  )
}

export default MenuButtons
