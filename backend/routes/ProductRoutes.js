import express from "express";
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct } from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js"; // Biar nanti route hanya bisa diakses user yang telah login

const router = express.Router();
router.get("/products", verifyUser, getProducts);
router.get("/product/data/:id", verifyUser, getProductByID);
router.post("/products", verifyUser, createProduct);
router.patch("/product/edit/:id", verifyUser, updateProduct);
router.delete("/product/:id", verifyUser, deleteProduct);

export default router;
