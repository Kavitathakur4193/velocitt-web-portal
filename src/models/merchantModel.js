import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema({
    
    name: {
      type: String, 
      required: true,
     
    },
    contact: {
      type: Number, 
      required: true,
     
    },
    email: {
      type: String,
      required: true,

    },
    password: {
      type: String, 
      required: true,

    },
  },
  {
    timestamps: true,
  }
)
  
  export const Merchants = mongoose.model("merchants", merchantSchema);

  