import { configureStore } from "@reduxjs/toolkit"
import { playerList, game, round } from "./reducers.js"

const store = configureStore({
  reducer: {
    playerList: playerList,
    game: game,
    round: round
  }
})

export default store