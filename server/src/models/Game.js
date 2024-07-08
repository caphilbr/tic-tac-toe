import mongoose from "mongoose"
import gameSchema from "../db/schemas/gameSchema.js"

const Game = mongoose.model('Game', gameSchema)

export default Game