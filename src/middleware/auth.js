import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET,ADMIN_EMAIL } from "../config/configuration.js";
import { throwError } from '../middleware/errorHandler.js';

export const Auth = async (req, res,next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throwError(401,"No authorization header provided" );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throwError(401,"Token not provided");
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    req.user = decodedToken;

    console.log(req.user);
  next();
  } catch (error) {
    throwError(401,"Authentication failed" );
  }
};

export const verifyAdmin = (req, res, next) => {
  try {
    const email = req.user?.email;

    if (!email) {
      throwError(400,'Email is required to verify admin.');
    }

    if (email !== ADMIN_EMAIL) {
      throwError(403,'Access denied. Admin only.');
    }

    next(); 
  } catch (error) {
    next(error)
  }
};