const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

async function connectToMongo() {
    await mongoose.connect(`${MONGO_URL}/${DB_NAME}`);
    console.log('Connected to MongoDB')
}

module.exports = connectToMongo;