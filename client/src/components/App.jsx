import "./../App.scss"
import GameBoard from "./GameBoard"

function App() {
  return (
    <>
      <div className="title__container_center">
        <h1 className="title__main_game">Tic Tac Toe</h1>
      </div>
      <GameBoard />
    </>
  )
}

export default App
