import "./../App.scss"
import { useState } from "react"
import GameBoard from "./GameBoard"
import MenuButtons from "./MenuButtons"
import NewGameForm from "./NewGameForm"
import WinnerDisplay from "./WinnerDisplay"
import DrawDisplay from "./DrawDisplay"

function App() {
  const [showNewGame, setShowNewGame] = useState(false)
  const [roundStatus, setRoundStatus] = useState(null)
  
  return (
    <>
      {showNewGame && (
        <NewGameForm setShowNewGame={setShowNewGame} />
      )}
      {roundStatus == "win" && <WinnerDisplay setRoundStatus={setRoundStatus}/>}
      {roundStatus == "draw" && <DrawDisplay setRoundStatus={setRoundStatus}/>}
      <div className="title__container_center">
        <h1 className="title__main_game">Tic Tac Toe</h1>
      </div>
      <MenuButtons setShowNewGame={setShowNewGame} />
      <GameBoard setRoundStatus={setRoundStatus}/>
    </>
  )
}

export default App
