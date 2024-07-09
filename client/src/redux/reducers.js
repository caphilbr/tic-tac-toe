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
    players: {},
    isActive: false,
    rounds: [],
  },
  action
) => {
  switch (action.type) {
    case "START_GAME":
      return action.gameInstance
    case "END_GAME":
      const updatedRounds = state.rounds.slice(0, -1)
      updatedRounds.push({
        ...state.rounds[state.rounds.length - 1],
        isActive: false,
      })
      return {
        ...state,
        isActive: false,
        rounds: updatedRounds,
      }
    case "UPDATE_ROUND":
      const latestRounds = state.rounds.slice(0, -1)
      latestRounds.push(action.round)
      return {
        ...state,
        rounds: latestRounds,
      }
    default:
      return state
  }
}
