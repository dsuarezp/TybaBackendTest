import jwt from 'jsonwebtoken';
import BlacklistToken from '../models/BlacklistToken.js';

export default async function authMiddleware(req, res, next) {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  
  // Verificar si no hay token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extraer el token JWT
  const token = authHeader.split(' ')[1];

  try {
    // Verificar si el token está en la lista negra
    const isTokenBlacklisted = await BlacklistToken.exists({ token });
    if (isTokenBlacklisted) {
      return res.status(401).json({ msg: 'Token is no longer valid' });
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar el usuario decodificado al objeto de solicitud (req)
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
