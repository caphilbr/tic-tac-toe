import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { replacePlayerList, startGame } from "./../redux/actions.js"
import config from "../config"
import CheckboxList from "./CheckboxList.jsx"

const SelectPlayers = (props) => {
  const playerList = useSelector((state) => state.playerList)
  const dispatch = useDispatch()
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const getPlayerList = async () => {
    try {
      const url = config.apiHost + "/api/v1/player"
      const response = await fetch(url)
      const parsedResponse = await response.json()
      dispatch(replacePlayerList(parsedResponse.playerList))
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getPlayerList()
  }, [])

  const handleSelect = (event) => {
    if (event.currentTarget.checked) {
      setSelectedPlayers([...selectedPlayers, event.currentTarget.name])
    } else {
      setSelectedPlayers(
        selectedPlayers.filter((player) => {
          return player != event.currentTarget.name
        })
      )
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!errorMessage) {
      try {
        const url = config.apiHost + "/api/v1/game"
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({ players: playerList }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        } else {
          const parsedResponse = await response.json()
          dispatch(startGame(parsedResponse.game))
          props.closeForm()
        }
      } catch (error) {
        console.log(error.message)
      }

    }
  }

  let errorMessage = null
  if (playerList.length <= 1) {
    errorMessage = (
      <div className="selectplayer__message">
        <p>There must be at least 2 players</p>
        <p>Please add new players</p>
      </div>
    )
  }
  if (playerList.length >= 2 && selectedPlayers.length != 2) {
    errorMessage = (
      <div className="selectplayer__message">
        <p>Please select 2 players</p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CheckboxList playerList={playerList} handleSelect={handleSelect} />
        {errorMessage}
        {!errorMessage && (
          <input type="submit" value="Start Game" className="button__form" />
        )}
      </form>
    </>
  )
}

export default SelectPlayers
