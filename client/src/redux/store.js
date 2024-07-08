import { configureStore } from "@reduxjs/toolkit"
import { playerList, game } from "./reducers.js"

const store = configureStore({
  reducer: {
    playerList: playerList,
    game: game
  }
})

export default store