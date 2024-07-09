import mongoose from "mongoose"
import Round from "./../../models/Round.js"
import Player from "./../../models/Player.js"

const gameSchema = new mongoose.Schema(
  {
    players: {
      X: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      xWins: { type: Number, default: 0 },
      O: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      oWins: { type: Number, default: 0 },
    },
    isActive: { type: Boolean, default: true },
    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Round" }],
    numberOfDraws: { type: Number, default: 0 }
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
      },

      async updateWinLoss() {
        await this.populate('rounds')
        let xWins = 0
        let oWins = 0
        let draws = 0
        for (const round of this.rounds) {
          if (!round.isActive) {
            round.winner == "X" ? xWins++ :
            round.winner == "O" ? oWins++ :
            draws++
          }
        }
        this.players.xWins = xWins
        this.players.oWins = oWins
        this.numberOfDraws = draws
        await this.save()
        return this.populate("players")
      }

    },
  }
)

gameSchema.statics.createGame = async function(playerNameArray) {
  const newGame = new this()
  const playerX = await Player.findOne({ name: playerNameArray[0] })
  const playerO = await Player.findOne({ name: playerNameArray[1] })
  newGame.addPlayer("X", playerX)
  newGame.addPlayer("O", playerO)
  await newGame.addInitialRound()
  await newGame.save()
  return newGame
}

export default gameSchema
