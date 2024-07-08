import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

class mongoConfig {
  static async initMongo() {
    const mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
  }

  static async stopMongo() {
    if (mongoServer) {
      await mongoServer.stop()
    }
  }
}

export default mongoConfig
