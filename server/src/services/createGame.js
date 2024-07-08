import Game from "../models/Game.js"

const createGame = async () => {
  const newGame = new Game()
  let id
  await newGame.save().then(savedGame => id = savedGame._id)
  const emptyGame = await Game.findById(id)
  return emptyGame
}

export default createGame