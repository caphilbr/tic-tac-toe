import mongoose from "mongoose"

const roundSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  firstMove: { type: String, default: 'X' },
  nextMove: { type: String, default: 'X' },
  moves: [{}],
  winner: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
},
{
  methods: {
    addMove(move) {
      this.moves.push(move)
      if (this.nextMove == "O") {
        this.nextMove = "X"
      } else {
        this.nextMove = "O"
      }
    }
  }
})

roundSchema.statics.createRound = async function() {
  const newRound = new this()
  const savedRound = await newRound.save()
  return savedRound
}

export default roundSchema