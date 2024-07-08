import express from "express"
import cors from "cors"
import mongoConfig from "./db/mongoConfig.js"
import rootRouter from "./routes/rootRouter.js"

const app = express()
const PORT = 5001

const startServer = async () => {
  await mongoConfig.initMongo()
  app.use(cors())
  app.use(express.json())
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
  app.use(rootRouter)
}

try {
  startServer()
} catch (error) {
  console.error("Error starting server:", error)
}

process.on("SIGINT", async () => {
  await mongoConfig.stopMongo()
  process.exit(0)
})
