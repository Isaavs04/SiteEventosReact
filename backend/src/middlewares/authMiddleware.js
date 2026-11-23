
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: 'Token não fornecido.'
    });
  }

  const [tipo, token] = authHeader.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({
      mensagem: 'Formato de token inválido.'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload;

    return next();

  } catch (erro) {
    return res.status(401).json({
      mensagem: 'Token inválido ou expirado.'
    });
  }
}

module.exports = verificarToken;
