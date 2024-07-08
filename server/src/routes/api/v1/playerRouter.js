import express from "express"
import Player from "../../../models/Player.js"

const playerRouter = new express.Router()

playerRouter.get("/", async (req, res) => {
  res.send("hello")
})

playerRouter.post("/", async (req, res) => {
  try {
    const alreadyExists = await Player.findOne({ name: req.body.name })
    if (alreadyExists) {
      res.status(400).json({ error: "Error: Name already exists" })
    } else {
      const newPlayer = new Player({ name: req.body.name })
      await newPlayer.save()
      const player = await Player.findOne({ name: req.body.name })
      res.status(201).json({ player })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default playerRouter
