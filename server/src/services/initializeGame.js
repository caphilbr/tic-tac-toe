import Player from "./../models/Player.js"

const initializeGame = async (game, playerNameArray) => {
  const playerX = await Player.findOne({ name: playerNameArray[0].name })
  const playerO = await Player.findOne({ name: playerNameArray[1].name })
  game.addPlayer("X", playerX)
  game.addPlayer("O", playerO)
  await game.addRound()
  return game
}

export default initializeGame