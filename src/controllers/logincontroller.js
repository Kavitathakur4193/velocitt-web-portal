import bcrypt from 'bcrypt';
import {Merchants} from '../models/merchantModel.js';
import { generateTokens } from '../helpers/token.js';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../config/configuration.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Admin login
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const payload = { email };
    const { accessToken, refreshToken } = generateTokens(payload);
    return res.json({ 
      message: 'Admin login successful', 
      accessToken,
      refreshToken });
  }

  // User login
  const user = await Merchants.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

  const payload = { userId: user._id, email: user.email };
  const { accessToken, refreshToken } = generateTokens(payload);

  res.json({
     message: 'User login successful',
     accessToken,
     refreshToken });
};
