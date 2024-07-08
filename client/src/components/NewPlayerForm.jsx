import { useState } from "react"
import config from "./../config.js"
import FormError from "./FormError.jsx"

const NewPlayerForm = (props) => {
  const [player, setPlayer] = useState({
    name: "",
  })
  const [errorMessage, setErrorMessage] = useState(null)

  const validateInput = (payload) => {
    setErrorMessage(null)
    let newError = null
    if (payload == "") {
      newError = "Error: Name cannot be blank"
    }
    if (newError) {
      setErrorMessage(newError)
      return false
    }
    return true
  }

  const closeForm = () => {
    props.setGameStatus({
      ...props.gameStatus,
      showAddPlayer: false,
    })
  }

  const handleChange = (event) => {
    setPlayer({ name: event.currentTarget.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(player.name)) {
      try {
        const url = config.apiHost + "/api/v1/player"
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(player),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          if (response.status == 400) {
            return setErrorMessage("Error: Name already exists")
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        } else {
          const parsedResponse = await response.json()
          console.log(parsedResponse)
          closeForm()
          // add new player to Redux list of players
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="popout__container">
      <p className="title__form">New Player Form</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="popout__container_label">
          Player Name:
        </label>
        <input
          type="text"
          id="name"
          className="popout__container_input"
          value={player.name}
          onChange={handleChange}
        />
        <FormError errorMessage={errorMessage} />
        <div className="button__container">
          <input
            type="submit"
            value="Add Player"
            className="button__playerForm"
          />
          <span className="button__playerForm" onClick={closeForm}>
            Cancel
          </span>
        </div>
      </form>
    </div>
  )
}

export default NewPlayerForm
