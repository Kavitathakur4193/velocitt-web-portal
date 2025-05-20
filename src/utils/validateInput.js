
import validator from 'validator';

// Validate email 
export const isValidEmail = (email) => {
  return validator.isEmail(email);
};

// Validate contact 
export const isValidContact = (contact) => {
  return /^\d{10}$/.test(contact);
};