import mongoose from "mongoose"
import winCombinations from "../../assets/winCombinations.js"

const roundSchema = new mongoose.Schema(
  {
    gameId: { type: String, default: "" },
    firstMove: { type: String, default: "X" },
    nextMove: { type: String, default: "X" },
    moves: [{}],
    winner: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  {
    methods: {
      async addMove(move) {
        this.moves.push(move)
        if (this.nextMove == "O") {
          this.nextMove = "X"
        } else {
          this.nextMove = "O"
        }
        await this.save()
      },

      playerMoves(letter) {
        const movesArray = []
        this.moves.forEach((move) => {
          if (move[1] == letter) movesArray.push(move[0])
        })
        return movesArray
      },

      async roundStatus() {
        const playerXMoves = this.playerMoves("X")
        const playerOMoves = this.playerMoves("O")
        for (const combo of winCombinations) {
          if (
            combo.every((squareNumber) => playerXMoves.includes(squareNumber))
          ) {
            this.winner = "X"
            this.isActive = false
            await this.save()
            return "win"
          }
          if (
            combo.every((squareNumber) => playerOMoves.includes(squareNumber))
          ) {
            this.winner = "O"
            this.isActive = false
            await this.save()
            return "win"
          }
        }
        if (this.isActive && this.moves.length == 9) {
          this.winner = "draw"
          this.isActive = false
          await this.save()
          return "draw"
        }
        if (this.isActive) return null
      },
    },
  }
)

roundSchema.statics.createRound = async function (gameId) {
  const newRound = new this()
  newRound.gameId = gameId
  const savedRound = await newRound.save()
  return savedRound
}

export default roundSchema
