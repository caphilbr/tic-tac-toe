import mongoose from "mongoose"
import playerSchema from "../db/schemas/playerSchema.js"

const Player = mongoose.model('Player', playerSchema)

export default Player