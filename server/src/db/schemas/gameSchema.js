import mongoose from "mongoose"
import Round from "./../../models/Round.js"

const gameSchema = new mongoose.Schema(
  {
    players: {
      X: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      O: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    },
    isActive: { type: Boolean, default: true },
    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Round" }],
  },
  {
    methods: {
      addPlayer(letter, newPlayer) {
        this.players[letter] = newPlayer
      },
      async addRound() {
        const newRound = await Round.createRound()
        this.rounds.push(newRound)
      },
    },
  }
)

gameSchema.statics.createGame = async function() {
  const newGame = new this()
  const savedGame = await newGame.save()
  return savedGame
}

export default gameSchema
