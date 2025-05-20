import { throwError } from '../middleware/errorHandler.js';
import {MasterProducts} from "../models/masterProductModel.js";

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, category, price } = req.body;

    // Basic validations
    if (!name || !description || !category || !price) {
      throwError(400, 'All fields are required.');
    }

    const product = new MasterProducts({
      name,
      description,
      category,
      price, 
    });

    await product.save();

    res.status(201).json({
      message: 'Product added successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};