const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).send({ message: "Token requerido" });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Token inválido" });
    }

    req.usuario = decoded;
    next();
  });
};