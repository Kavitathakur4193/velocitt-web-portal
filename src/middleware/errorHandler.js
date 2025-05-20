
export const errorHandler = (err, req, res, next) => {
  const { code, message } = formatError(err);
  res.status(code).json({ message });
};

const formatError = (err = {}) => {
  let code = err.statusCode || err.code || 500;
  let message = err.customMessage || 'Internal Server Error';

  // MongoDB Duplicate Entry Error
  if (err.code === 11000 && err.keyValue) {
    const [[field, value]] = Object.entries(err.keyValue);
    code = 409;
    message = `${field} : ${value} is Duplicate Entry`;
  }

  const statusCodes = [400, 401, 403, 404, 409, 503];
  if (!statusCodes.includes(code)) {
    code = 500;
    message = 'Internal Server Error';
  }

  return { code, message };
};


export const throwError = (code = 500,
     message = 'Internal Server Error') => {
  const error = new Error(message);
  error.code = code;
  error.customMessage = message;
  throw error;
};



