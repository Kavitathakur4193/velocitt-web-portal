
import { throwError } from '../middleware/errorHandler.js';
import { isValidEmail, isValidContact } from '../utils/validateInput.js';
import {Merchants} from '../models/merchantModel.js'; 


export const validateAddMerchant = async ({ name, contact, email, password }) => {
  // Required fields 
  if (!name || !contact || !email || !password) {
    throwError(400, 'All fields are required.');
  }

  //  validate Email
  if (!isValidEmail(email)) {
    throwError(400, 'Invalid email format.');
  }

  //  validate Contact
  if (!isValidContact(contact)) {
    throwError(400, 'Contact must be a 10-digit number.');
  }

  // existing email 
  const existing = await Merchants.findOne({ email });
  if (existing) {
    throwError(409, 'Merchant already exists with this email.');
  }
};


