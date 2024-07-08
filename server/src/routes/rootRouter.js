import express from 'express'
import playerRouter from './api/v1/playerRouter.js'
import gameRouter from './api/v1/gameRouter.js'

const rootRouter = new express.Router()

rootRouter.use("/api/v1/player", playerRouter)
rootRouter.use("/api/v1/game", gameRouter)

export default rootRouter