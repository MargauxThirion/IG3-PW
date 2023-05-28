const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  // isole partie du token que l'on veut récupérer
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  // décode le token
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    } catch (error) {
        res.status(4010).json({ error });
    }
};