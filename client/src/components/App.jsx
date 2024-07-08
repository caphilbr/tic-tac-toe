import "./../App.scss"
import { useState } from "react"
import GameBoard from "./GameBoard"
import MenuButtons from "./MenuButtons"
import NewPlayerForm from "./NewPlayerForm"
import WinnerDisplay from "./WinnerDisplay"

function App() {
  const [gameStatus, setGameStatus] = useState({
    showAddPlayer: false,
  })
  return (
    <>
      {gameStatus.showAddPlayer && (
        <NewPlayerForm gameStatus={gameStatus} setGameStatus={setGameStatus} />
      )}
      {/* <WinnerDisplay /> */}
      <div className="title__container_center">
        <h1 className="title__main_game">Tic Tac Toe</h1>
      </div>
      <MenuButtons gameStatus={gameStatus} setGameStatus={setGameStatus} />
      <GameBoard />
    </>
  )
}

export default App
