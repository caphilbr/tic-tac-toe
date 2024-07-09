const nextFirstMove = (game) => {
  const latestFirstMove = game.rounds[game.rounds.length - 1].firstMove
  let firstMove = "X"
  if (latestFirstMove == "X") firstMove = "O"
  return firstMove
}

export default nextFirstMove