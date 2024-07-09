import { useSelector } from "react-redux"

const WinLoss = () => {
  const game = useSelector((state) => state.game)
  return (
    <>
      {game.isActive ? (
        <div className="winloss__container">
          <div className="winloss__display_box">
            <p className="title__winloss">Win Tally</p>
            <p>{game.players.xWins} - {game.players.X.name}</p>
            <p>{game.players.oWins} - {game.players.O.name}</p>
            <p>{game.numberOfDraws} - Draws</p>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default WinLoss
