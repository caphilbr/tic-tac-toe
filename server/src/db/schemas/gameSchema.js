import mongoose from "mongoose"
import createRound from "../../services/createRound.js"

const gameSchema = new mongoose.Schema(
  {
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    winner: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round' }],
  },
  {
    methods: {
      addPlayer(newPlayer) {
        this.players.push(newPlayer)
      },
      async addRound() {
        const newRound = await createRound()
        this.rounds.push(newRound)
      },
    },
  }
)

export default gameSchema