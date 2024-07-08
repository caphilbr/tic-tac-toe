import mongoose from "mongoose"
import Round from "./../../models/Round.js"

const gameSchema = new mongoose.Schema(
  {
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    isActive: { type: Boolean, default: true },
    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Round" }],
  },
  {
    methods: {
      addPlayer(newPlayer) {
        this.players.push(newPlayer)
      },
      async addRound() {
        const newRound = await Round.createRound()
        this.rounds.push(newRound)
      },
    },
  }
)

gameSchema.statics.createGame = function() {
  return new this()
}

export default gameSchema
