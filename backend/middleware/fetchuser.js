const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET_STRING = process.env.JWT_SECRET_STRING;

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error: 'Authenticate using a valid token'});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_STRING);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({error: 'Authenticate using a valid token'});
    }
}

module.exports = fetchuser;