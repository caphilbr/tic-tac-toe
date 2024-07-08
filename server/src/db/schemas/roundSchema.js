import mongoose from "mongoose"

const roundSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  moves: [{}],
  winner: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
})

roundSchema.statics.createRound = function() {
  return new this()
}

export default roundSchema