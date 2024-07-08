import { useState } from "react"
import { useDispatch } from "react-redux"
import { addPlayer } from "./../redux/actions.js"
import config from "./../config.js"
import FormError from "./FormError.jsx"

const NewPlayerForm = (props) => {
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
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
    props.setShowPlayerForm(false)
  }

  const handleChange = (event) => {
    setPayload({ name: event.currentTarget.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(payload.name)) {
      try {
        const url = config.apiHost + "/api/v1/player"
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(payload),
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
          dispatch(addPlayer(parsedResponse.player.name))
          closeForm()
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="popout__container_newPlayer">
      <p className="title__form">New Player Form</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="newplayer__label">
          Player Name:
        </label>
        <input
          type="text"
          id="name"
          className="newplayer__input"
          value={payload.name}
          onChange={handleChange}
        />
        <FormError errorMessage={errorMessage} />
        <div className="button__container">
          <input
            type="submit"
            value="Add Player"
            className="button__form"
          />
          <span className="button__form" onClick={closeForm}>
            Cancel
          </span>
        </div>
      </form>
    </div>
  )
}

export default NewPlayerForm
