import config from "../config"

const updateWinLoss = async (gameId) => {
  try {
    const url = config.apiHost + `/api/v1/game/win-loss/${gameId}`
    const response = await fetch(url)
    const parsedResponse = await response.json()
    return parsedResponse.game        
  } catch(error) {
    console.log(error)
    return null
  }
}

export default updateWinLoss