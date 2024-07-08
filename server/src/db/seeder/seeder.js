import Player from "../../models/Player.js"

const seeder = async () => {
  console.log('Seeding Player 1 and Player 2...')
  await Player.create({ name: "Player 1"})
  await Player.create({ name: "Player 2"})
}

export default seeder