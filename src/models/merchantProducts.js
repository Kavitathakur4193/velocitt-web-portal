import mongoose from 'mongoose';

const merchantProductSchema = new mongoose.Schema({
    
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchants",
     
    },
    merchantProducts:[ {
      
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MasterProducts",

        },
        productPrice: {
         type: Number,
         required:true,

        },
   },
    ],
  },
  {
    timestamps: true,
  }
)
  
  export const MerchantProducts = mongoose.model("merchantproducts", merchantProductSchema);

  