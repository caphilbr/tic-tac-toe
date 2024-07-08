import Round from "../models/Round.js"

const createRound = async () => {
  const newRound = new Round()
  let id
  await newRound.save().then(savedRound => id = savedRound._id)
  const emptyRound = await Round.findById(id)
  return emptyRound
}

export default createRound