import { useSelector, useDispatch } from "react-redux"
import { updateRound } from "./../redux/actions.js"
import Square from "./Square"
import config from "../config"

const GameBoard = (props) => {
  const game = useSelector((state) => state.game)
  const dispatch = useDispatch()
  let currentRound = null
  let moves = []
  let nextMove = null
  let nextPlayer = null
  if (game.isActive) {
    currentRound = game.rounds[game.rounds.length - 1]
    moves = currentRound.moves
    nextMove = currentRound.nextMove
    nextPlayer = game.players[nextMove].name
  }

  const handleMove = async (squareNumber) => {
    try {
      const roundId = currentRound._id
      const move = `${squareNumber}${nextMove}`
      const url = config.apiHost + `/api/v1/game/move/${roundId}/${move}`
      const response = await fetch(url, { method: "POST" })
      const parsedResponse = await response.json()
      props.setRoundStatus(parsedResponse.status)
      dispatch(updateRound(parsedResponse.round))
    } catch (error) {
      console.log(error)
    }
  }

  const turnNotice = game.isActive && currentRound.isActive ? (
    <div className="title__container_center">
      <div className="gameboard__nextMove_message">
        {`${nextPlayer}, please place your "${nextMove}"`}
      </div>
    </div>
  ) : null

  const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareNumber) => {
    let value = null
    for (const move of moves) {
      if (move[0] == squareNumber) value = move[1]
    }
    return (
      <Square
        key={squareNumber}
        squareNumber={squareNumber}
        value={value}
        handleMove={handleMove}
      />
    )
  })

  return (
    <>
      {turnNotice}
      <div className="gameboard__container">{squares}</div>
    </>
  )
}

export default GameBoard
