import mongoose from "mongoose"
import Round from "./../../models/Round.js"
import Player from "./../../models/Player.js"

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
      async addInitialRound() {
        const newRound = await Round.createRound(this._id)
        this.rounds.push(newRound)
      },
      async addNextRound(firstMove) {
        const newRound = await Round.createRound(this._id)
        newRound.firstMove = firstMove
        newRound.nextMove = firstMove
        await newRound.save()
        this.rounds.push(newRound)
        this.save()
        return newRound
      },
      async endGame() {
        this.isActive = false
        this.save()
      }
    },
  }
)

gameSchema.statics.createGame = async function(playerNameArray) {
  const newGame = new this()
  const playerX = await Player.findOne({ name: playerNameArray[0].name })
  const playerO = await Player.findOne({ name: playerNameArray[1].name })
  newGame.addPlayer("X", playerX)
  newGame.addPlayer("O", playerO)
  await newGame.addInitialRound()
  await newGame.save()
  return newGame
}

export default gameSchema
