const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectToMongo = require('./db.js');

dotenv.config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/auth.js'));
app.use('/notes', require('./routes/notes.js'));

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    connectToMongo();
})