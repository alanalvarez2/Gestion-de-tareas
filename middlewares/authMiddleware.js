const jwt = require('jsonwebtoken');
const claveSecreta = 'clave_secreta';

const verificarToken = (req, res, next) => {
  // Omitir la verificación del token para la ruta de registro
  if (req.path === '/registro') {
    return next();
  }

  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No autorizado' });

  try {
    const usuario = jwt.verify(token.split(' ')[1], claveSecreta);
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

module.exports = verificarToken;

