import express from "express"
import Game from "../../../models/Game.js"
import Round from "../../../models/Round.js"
import nextFirstMove from "../../../services/nextMove.js"

const gameRouter = new express.Router()

gameRouter.post("/end/:gameId", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId)
    await game.endGame()
    res.status(200).json({})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

gameRouter.post("/new-round/:gameId", async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId)
    await game.populate('rounds')
    const firstMove = nextFirstMove(game)
    const newRound = await game.addNextRound(firstMove)
    res.status(200).json({ round: newRound })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})


gameRouter.post("/move/:roundId/:move", async (req, res) => {
  try {
    const { roundId, move } = req.params
    const currentRound = await Round.findById(roundId)
    await currentRound.addMove(move)
    const status = await currentRound.roundStatus()
    res.status(201).json({ round: currentRound, status: status })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

gameRouter.post("/", async (req, res) => {
  try {
    const game = await Game.createGame(req.body.players)
    res.status(201).json({ game })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

export default gameRouter