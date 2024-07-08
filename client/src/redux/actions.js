export const addPlayer = (newPlayer) => {
  return {
    type: "ADD_PLAYER",
    newPlayer: newPlayer
  }
}

export const replacePlayerList = (playerList) => {
  return {
    type: "REPLACE_PLAYER_LIST",
    playerList: playerList
  }
}

export const startGame = (gameInstance) => {
  return {
    type: "START_GAME",
    gameInstance: gameInstance
  }
}

export const endGame = () => {
  return {
    type: "END_GAME"
  }
}