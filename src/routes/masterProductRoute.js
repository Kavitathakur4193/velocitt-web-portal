import { Router } from "express";

import {
  addProduct,
} from "../controllers/masterProductController.js";
import {Auth, verifyAdmin} from "../middleware/auth.js"

const router = Router();
router.post("/addProduct",Auth,verifyAdmin,addProduct);
// router.get("/getMerchants",Auth,verifyAdmin,getAllMerchants);

export default router;
