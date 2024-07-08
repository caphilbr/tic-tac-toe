import "./../App.scss"
import { useState } from "react"
import GameBoard from "./GameBoard"
import MenuButtons from "./MenuButtons"
import NewGameForm from "./NewGameForm"
import WinnerDisplay from "./WinnerDisplay"

function App() {
  const [showNewGame, setShowNewGame] = useState(false)

  return (
    <>
      {showNewGame && (
        <NewGameForm setShowNewGame={setShowNewGame} />
      )}
      {/* <WinnerDisplay /> */}
      <div className="title__container_center">
        <h1 className="title__main_game">Tic Tac Toe</h1>
      </div>
      <MenuButtons setShowNewGame={setShowNewGame} />
      <GameBoard />
    </>
  )
}

export default App
