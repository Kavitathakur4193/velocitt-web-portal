import {Merchants} from '../models/merchantModel.js';
import bcrypt from 'bcrypt';
import { validateAddMerchant} from '../helpers/merchant.js';
import { MasterProducts } from '../models/masterProductModel.js';
import { MerchantProducts } from '../models/merchantProducts.js';

export const addMerchant = async (req, res, next) => {
  try {
    const { name, contact, email, password } = req.body;

    await validateAddMerchant({ name, contact, email, password });

    // Password hashing 
    const hashedPassword = await bcrypt.hash(password, 10);
    const merchant = new Merchants({
       name, 
       contact, 
       email, 
       password: hashedPassword 
      });
    await merchant.save();

    res.status(201).json({ message: 'Merchant added successfully', merchant });
  } catch (error) {
    next(error);
  }
};

export const getAllMerchants = async (req, res, next) => {
  try {
    const merchants = await Merchants.find().select('-password'); 
    if (!merchants.length) {
      throwError(404, 'No merchants found');
    }

    res.status(200).json({
      message: 'Merchants fetched successfully',
      data: merchants,
    });
  } catch (error) {
    next(error); 
  }
};


export const mapMerchantProducts = async (req, res, next) => {
  try {
    const { products } = req.body;
    const merchantId = req.user?._id;


    const mappedProducts = [];

    for (const item of products) {
      const { productId, productPrice } = item;

      if (!productId || !productPrice) {
        throwError(400, 'Each product must contain productId and productPrice');
      }

      const masterProduct = await MasterProducts.findById(productId);
      if (!masterProduct) {
        throwError(404, `Product not found `);
      }

      if (masterProduct.price !== productPrice.toString()) {
        throwError(400, `Invalid price for product ${masterProduct.name}`);
      }

      mappedProducts.push({
        productId,
        productPrice,
      });
    }

    const merchantProductRecord = new MerchantProducts({
      merchantId,
      merchantProducts: mappedProducts,
    });

    await merchantProductRecord.save();

    res.status(201).json({
      message: 'Products successfully mapped to merchant',
      data: merchantProductRecord,
    });
  } catch (error) {
    next(error);
  }
};