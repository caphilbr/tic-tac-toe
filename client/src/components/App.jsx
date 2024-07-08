import "./../App.scss"
import GameBoard from "./GameBoard"
import MenuButtons from "./MenuButtons"
import PopoutBox from "./PopoutBox"
import WinnerDisplay from "./WinnerDisplay"

function App() {
  return (
    <>
      {/* <PopoutBox /> */}
      {/* <WinnerDisplay /> */}
      <div className="title__container_center">
        <h1 className="title__main_game">Tic Tac Toe</h1>
      </div>
      <MenuButtons />
      <GameBoard />
    </>
  )
}

export default App
