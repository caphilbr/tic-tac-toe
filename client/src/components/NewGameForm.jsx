import { useState } from "react"
import NewPlayerForm from "./NewPlayerForm.jsx"
import SelectPlayers from "./SelectPlayers.jsx"

const NewGameForm = (props) => {
  const [showPlayerForm, setShowPlayerForm] = useState(false)

  const closeForm = () => {
    props.setShowNewGame(false)
  }

  const addPlayerClick = () => {
    setShowPlayerForm(true)
  }

  return (
    <div className="popout__container_newGame">
      {showPlayerForm && (
        <NewPlayerForm setShowPlayerForm={setShowPlayerForm} />
      )}
      <div className="title__selectplayers">Select 2 Players</div>
      <div className="button__container">
        <span className="button__form" onClick={addPlayerClick}>
          + Add New Player
        </span>
      </div>
      <div className="selectplayer__form_container">
        <SelectPlayers closeForm={closeForm} />
      </div>
      <div className="button__container">
        <span className="button__form" onClick={closeForm}>
          Cancel
        </span>
      </div>
    </div>
  )
}

export default NewGameForm
