const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token d\'authentification manquant.' });
  }

  jwt.verify(token, 'RANDOM_TOKEN_SECRET', (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Token d\'authentification invalide.' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
