const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

async function connectToMongo() {
    await mongoose.connect(MONGO_URL);
}

module.exports = connectToMongo;