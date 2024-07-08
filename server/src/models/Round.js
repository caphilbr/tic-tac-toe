import mongoose from "mongoose"
import roundSchema from "./../db/schemas/roundSchema.js"

const Round = mongoose.model('Round', roundSchema)

export default Round