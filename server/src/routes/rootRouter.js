import express from 'express'
import playerRouter from './api/v1/playerRouter.js'

const rootRouter = new express.Router()

rootRouter.use("/api/v1/player", playerRouter)


export default rootRouter