const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({Error: 'Unauthorized'});
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({Error: 'Token is invalid'});
            } else {
                req.name = decoded;
                next();
            }
        });
    }
}

module.exports = verifyUser;