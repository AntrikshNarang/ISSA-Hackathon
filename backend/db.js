const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

async function connectToMongo() {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB')
}

module.exports = connectToMongo;