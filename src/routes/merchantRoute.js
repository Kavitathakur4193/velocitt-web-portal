import { Router } from "express";

import {
  addMerchant,
  getAllMerchants,
  mapMerchantProducts,
} from "../controllers/merchantController.js";
import {Auth, verifyAdmin} from "../middleware/auth.js"

const router = Router();
router.post("/addMerchant",Auth,verifyAdmin,addMerchant);
router.get("/getMerchants",Auth,verifyAdmin,getAllMerchants);
router.post("/mapMerchantProducts",Auth,mapMerchantProducts);

export default router;
