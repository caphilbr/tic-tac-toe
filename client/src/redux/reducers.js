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
    return {
        ...state,
        isActive: false
      }
    case "UPDATE_ROUND":
      const latestRounds = state.rounds.slice(0, -1)
      latestRounds.push(action.round)
      return {
        ...state,
        rounds: latestRounds,
      }
    case "NEW_ROUND":
    return {
        ...state,
        rounds: [
          ...state.rounds,
          action.newRound
        ]
      }
    default:
      return state
  }
}
