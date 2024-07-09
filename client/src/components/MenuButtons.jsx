import { useSelector, useDispatch } from "react-redux"
import { endGame, newRound } from "./../redux/actions.js"
import config from "../config.js"

const MenuButtons = (props) => {
  const game = useSelector((state) => state.game)
  const dispatch = useDispatch()
  const round = game.rounds[game.rounds.length - 1]

  const newGameClick = () => {
    props.setShowNewGame(true)
  }

  const endGameClick = async () => {
    try {
      const url = config.apiHost + `/api/v1/game/end/${game._id}`
      const response = await fetch(url, { method: "POST" })
      if (response.ok) {
        dispatch(endGame())
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    } catch (error) {
      console.log(error)
    }
  }

  const nextRoundClick = async () => {
    try {
      const url = config.apiHost + `/api/v1/game/new-round/${game._id}`
      const response = await fetch(url, { method: "POST" })
      if (response.ok) {
        const parsedResponse = await response.json()
        dispatch(newRound(parsedResponse.round))
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="button__container">
      {!game.isActive && (
        <span className="button__main_menu" onClick={newGameClick}>
          Start New Game
        </span>
      )}
      {game.isActive && round.isActive && (
        <span className="button__main_menu" onClick={endGameClick}>
          End Game
        </span>
      )}
      {game.isActive && !round.isActive && (
        <>
          <span className="button__main_menu" onClick={endGameClick}>
            End Game
          </span>
          <span className="button__main_menu" onClick={nextRoundClick}>Next Round</span>
        </>
      )}
    </div>
  )
}

export default MenuButtons
