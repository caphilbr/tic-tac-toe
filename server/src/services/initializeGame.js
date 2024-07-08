import Player from "./../models/Player.js"

const initializeGame = async (game, playerNameArray) => {
  for (const player of playerNameArray) {
    const playerObject = await Player.findOne({ name: player.name })
    game.addPlayer(playerObject)
  }
  await game.addRound()
  return game
}

export default initializeGame