import express from "express"
import createGame from "../../../services/createGame.js"
import initializeGame from "../../../services/initializeGame.js"

const gameRouter = new express.Router()

gameRouter.post("/", async (req, res) => {
  try {
    const emptyGame = await createGame()
    const game = await initializeGame(emptyGame, req.body.players)
    res.status(201).json({ game })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

export default gameRouter
