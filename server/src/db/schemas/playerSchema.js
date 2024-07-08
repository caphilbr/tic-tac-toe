import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
  name: String,
})

export default playerSchema
