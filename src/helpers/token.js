import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config/configuration.js';

export const generateTokens = (payload) => {
    try
    {

  const accessToken = jwt.sign(
    payload,
    ACCESS_TOKEN_SECRET, 
    { expiresIn: '15m' });
  const refreshToken = jwt.sign(
    payload, 
    REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
    }
    catch(error){
        throw error
    }
};
