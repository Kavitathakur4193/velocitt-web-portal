import mongoose from 'mongoose';

const masterProductSchema = new mongoose.Schema({
    
    name: {
      type: String, 
      required: true,
     
    },
    description: {
      type: String, 
      required: true,
     
    },
    category: {
      type: String,
      required: true,

    },
    price: {
      type: Number, 
      required: true,

    },
  },
  {
    timestamps: true,
  }
)
  
  export const MasterProducts = mongoose.model("masterproducts", masterProductSchema);

  