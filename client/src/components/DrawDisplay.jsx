import { useSelector, useDispatch } from "react-redux"
import { replaceGame } from "../redux/actions"
import updateWinLoss from "../services/updateWinLoss"

const DrawDisplay = (props) => {
  const game = useSelector(state => state.game)
  const dispatch = useDispatch()

  const handleContinue = async () => {
    const updatedGame = await updateWinLoss(game._id)
    dispatch(replaceGame(updatedGame))
    props.setRoundStatus(null)
  }
  
  return (
    <div className="winner__container">
      <div className="winner__draw_font">It's a draw</div>
      <div className="button__container">
        <span className="button__winner" onClick={handleContinue}>Continue</span>
      </div>
    </div>
  )
}

export default DrawDisplay