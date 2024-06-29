import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import BlacklistToken from '../models/BlacklistToken.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Crear un nuevo usuario y hashear su contraseña
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Generar el token JWT
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar el usuario en la base de datos
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Verificar la contraseña y generar el token si es correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const logout = async (req, res) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar si el token ya está en la lista negra
    const existingToken = await BlacklistToken.findOne({ token });

    if (existingToken) {
      return res.status(400).json({ msg: 'Token already blacklisted' });
    }

    // Guardar el token en la lista negra
    const blacklistToken = new BlacklistToken({ token });
    await blacklistToken.save();

    res.json({ msg: 'User logged out successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
