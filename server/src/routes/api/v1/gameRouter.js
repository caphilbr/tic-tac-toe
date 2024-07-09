import express from "express"
import Game from "../../../models/Game.js"
import Round from "../../../models/Round.js"
import initializeGame from "../../../services/initializeGame.js"

const gameRouter = new express.Router()

gameRouter.post("/move/:roundId/:move", async (req, res) => {
  const { roundId, move } = req.params
  const currentRound = await Round.findById(roundId)
  currentRound.addMove(move)
  currentRound.save()
  res.status(201).json({ round: currentRound })
})

gameRouter.post("/", async (req, res) => {
  try {
    const emptyGame = await Game.createGame()
    const game = await initializeGame(emptyGame, req.body.players)
    res.status(201).json({ game })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

export default gameRouter
