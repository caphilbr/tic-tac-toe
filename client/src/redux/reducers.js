export const playerList = (state = [], action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      return [
        ...state,
        {
          name: action.newPlayer,
        },
      ]
    case "REPLACE_PLAYER_LIST":
      return action.playerList
    default:
      return state
  }
}

export const game = (
  state = {
    players: [],
    winner: null,
    isActive: false,
    rounds: [],
  },
  action
) => {
  switch (action.type) {
    case "START_GAME":
      return action.gameInstance
    default:
      return state
  }
}
