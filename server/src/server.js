// server.js
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const app = express();
const PORT = 5001;
let mongoServer;

// Function to start the MongoDB Memory Server and connect to it
const startServer = async () => {
    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri)

    console.log('MongoDB Memory Server connected');

    // Define a simple schema and model for testing
    const PersonSchema = new mongoose.Schema({
        name: String,
        age: Number,
    });
    const Person = mongoose.model('Person', PersonSchema);

    // Example API route
    app.get('/api', async (req, res) => {
        const john = new Person({ name: 'John', age: 34 });
        await john.save();
        const result = await Person.findOne({ name: 'John' });
        res.json({ person: result });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Start the server
try {
    startServer()
} catch (error) {
    console.error('Error starting server:', error)
}

// Clean up function when Node.js process exits
process.on('SIGINT', async () => {
    if (mongoServer) {
        await mongoServer.stop();
    }
    process.exit(0);
});
